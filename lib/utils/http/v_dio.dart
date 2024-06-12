import 'package:dio/dio.dart';
import 'package:tempalte/utils/http/interceptor.dart';
import 'package:tempalte/utils/sp_util/sp_util.dart';

class RequestConfig {
  late String url;
  final Map<String, dynamic>? data;
  final Map<String, dynamic>? params;
  final bool withToken;

  RequestConfig(this.url, {this.data, this.params, this.withToken = true});
}

class VDio {
  static final VDio _instance = VDio._internal();
  static late final Dio dio;

  factory VDio() {
    return _instance;
  }

  VDio._internal() {
    dio = Dio();
  }

  init(BaseOptions baseOptions) {
    dio.options = baseOptions;
    dio.interceptors.add(CustomInterceptor());
  }

  Future<T> get<T>(RequestConfig config) {
    return request<T>(config, Options(method: "get"));
  }

  Future<T> post<T>(RequestConfig config) {
    return request<T>(config, Options(method: "post"));
  }

  Future<T> request<T>(RequestConfig config, Options options) {
    if (config.withToken) {
      String? token = SpUtil().getString("token");
      if (token != null) {
        if (options.headers == null) {
          options.headers = {
            "token": token,
          };
        } else {
          options.headers!.addAll({"token": token});
        }
      } else {
        // token过期
        return Future.error("");
      }
    }
    return dio
        .request<T>(
      config.url,
      options: options,
      queryParameters: config.params,
      data: config.data,
    )
        .then((value) {
      // 返回前要处理下数据
      return Future.value(value.data);
    }, onError: (err) {});
  }
}

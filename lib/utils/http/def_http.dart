import 'package:dio/dio.dart';
import 'package:tempalte/utils/http/v_dio.dart';

class DefHttp {
  static void init(BaseOptions baseOptions) {
    VDio().init(baseOptions);
  }

  static Future<T> get<T>(RequestConfig config) {
    return VDio().get<T>(config);
  }

  static Future<T> post<T>({
    required String url,
    Map<String, dynamic>? data,
  }) {
    return VDio().post<T>(RequestConfig(url, data: data));
  }
}

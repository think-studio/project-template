import 'package:dio/dio.dart';

class CustomInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    print(options.queryParameters);
    super.onRequest(options, handler);
  }

  @override
  void onResponse(Response response, ResponseInterceptorHandler handler) {
    super.onResponse(response, handler);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    if (err.response != null && err.response!.statusCode != null) {
      int statusCode = err.response!.statusCode!;
      if (statusCode == 404) {
      } else if (statusCode == 500) {}
    } else {
      // 未知错误
    }
    super.onError(err, handler);
  }
}

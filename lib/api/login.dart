import 'package:tempalte/utils/http/def_http.dart';
import 'package:tempalte/utils/http/v_dio.dart';

loginApi() {
  return DefHttp.get(RequestConfig(
    '/s',
    params: {"wd": 123},
    withToken: true,
  ));
}

import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tempalte/api/config.dart';
import 'package:tempalte/router/router.dart';
import 'package:tempalte/utils/http/def_http.dart';
import 'package:tempalte/utils/sp_util/sp_util.dart';

bootstrap() async {
  DefHttp.init(BaseOptions(
    baseUrl: baseUrl,
    connectTimeout: const Duration(seconds: 15),
    receiveTimeout: const Duration(seconds: 15),
  ));

  await SpUtil().init();
}

void main() async {
  WidgetsBinding widgetsBinding = WidgetsFlutterBinding.ensureInitialized();
  if (Platform.isAndroid && Platform.isIOS) {
    FlutterNativeSplash.preserve(widgetsBinding: widgetsBinding);
  }

  await bootstrap();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: const Size(390, 884),
      child: MaterialApp.router(
        routerConfig: router,
        title: 'template',
        theme: ThemeData(
          useMaterial3: true,
        ),
      ),
    );
  }
}

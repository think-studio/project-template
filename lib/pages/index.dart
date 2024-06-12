import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:go_router/go_router.dart';
import 'package:tempalte/api/login.dart';

class IndexPage extends StatefulWidget {
  const IndexPage({super.key});

  @override
  State<IndexPage> createState() => _IndexPageState();
}

class _IndexPageState extends State<IndexPage> {
  @override
  void initState() {
    super.initState();
    if (Platform.isAndroid && Platform.isIOS) {
      FlutterNativeSplash.remove();
    }
    loginApi();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("121"),
      ),
      body: Center(
        child: Column(
          children: [
            OutlinedButton(
              onPressed: () {
                context.pushNamed("login");
              },
              child: const Text("login"),
            )
          ],
        ),
      ),
    );
  }
}

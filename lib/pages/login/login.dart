import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("登录"),
      ),
      body: Center(
        child: Column(
          children: [
            OutlinedButton(
              onPressed: () {
                if (context.canPop()) {
                  context.pop();
                } else {
                  context.goNamed("index");
                }
              },
              child: const Text("返回"),
            ),
          ],
        ),
      ),
    );
  }
}

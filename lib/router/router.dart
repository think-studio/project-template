import 'package:go_router/go_router.dart';
import 'package:tempalte/pages/index.dart';
import 'package:tempalte/pages/login/login.dart';

final GoRouter router = GoRouter(routes: [
  GoRoute(
    path: "/",
    name: 'index',
    builder: (context, state) {
      return const IndexPage();
    },
  ),
  GoRoute(
    path: "/login",
    name: "login",
    builder: (context, state) {
      return const LoginPage();
    },
  )
]);

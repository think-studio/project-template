// 是否为生产环境
bool isProduct = const bool.fromEnvironment("dart.vm.product");

String baseUrl = isProduct ? '' : 'https://www.baidu.com';

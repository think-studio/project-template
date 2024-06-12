import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

// 本地存储
class SpUtil {
  SpUtil._internal();
  static final SpUtil _instance = SpUtil._internal();

  factory SpUtil() {
    return _instance;
  }

  SharedPreferences? prefs;

  Future<void> init() async {
    prefs = await SharedPreferences.getInstance();
  }

  Future<bool> setJSON(String key, dynamic jsonVal) {
    String jsonString = jsonEncode(jsonVal);
    return prefs!.setString(key, jsonString);
  }

  Future<bool> setString(String key, String value,
      {int expires = 1000 * 3600 * 24 * 6}) {
    Map<String, dynamic> data = {
      'value': value,
      'expires': DateTime.now().millisecondsSinceEpoch + expires
    };
    String jsonString = jsonEncode(data);
    return prefs!.setString(key, jsonString);
  }

  dynamic getJSON(String key) {
    String? jsonString = prefs?.getString(key);
    return jsonString == null ? null : jsonDecode(jsonString);
  }

  String? getString(String key) {
    String? jsonString = prefs?.getString(key);
    Map<String, dynamic>? data =
        jsonString == null ? null : jsonDecode(jsonString);
    if (data == null) {
      return null;
    }
    if (data['expires'] < DateTime.now().millisecondsSinceEpoch) {
      return null;
    }
    return data['value'];
  }

  Future<bool> setBool(String key, bool val) {
    return prefs!.setBool(key, val);
  }

  bool? getBool(String key) {
    return prefs!.getBool(key);
  }

  Future<bool> remove(String key) {
    return prefs!.remove(key);
  }
}

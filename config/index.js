import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';

const config = {
	projectName: 'mini',
	date: '2023-6-29',
	designWidth: 375,
	deviceRatio: {
		640: 2.34 / 2,
		750: 1,
		828: 1.81 / 2,
		375: 2 / 1
	},
	sourceRoot: 'src',
	outputRoot: 'dist',
	plugins: [
		'@tarojs/plugin-html',
		[
			'tarojs-plugin-generator',
			{
				css: 'sass' //可配置css编译器： 支持 none sass less stylus
			}
		]
	],
	alias: {
		'/@': path.resolve(__dirname, '..', 'src')
	},
	defineConstants: {},
	copy: {
		patterns: [],
		// patterns: [{ from: 'src/images', to: 'dist/images' }],
		options: {}
	},
	framework: 'react',
	compiler: 'webpack5',
	cache: {
		enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
	},
	sass: {
		data: `@import "@nutui/nutui-react-taro/dist/styles/variables.scss";`
	},
	mini: {
		imageUrlLoaderOption: {
			limit: 100,
			mimetype: 'image/png',
			encoding: 'base64'
		},
		miniCssExtractPluginOption: {
			ignoreOrder: true
		},
		optimizeMainPackage: {
			enable: true
		},
		postcss: {
			pxtransform: {
				enable: true,
				config: {
					selectorBlackList: ['nut-']
				}
			},
			url: {
				enable: true,
				config: {
					limit: 1024 // 设定转换尺寸上限
				}
			},
			cssModules: {
				enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
				config: {
					namingPattern: 'module', // 转换模式，取值为 global/module
					generateScopedName: '[name]__[local]___[hash:base64:5]'
				}
			}
		},
		webpackChain(chain, webpack) {
			chain.module
				.rule('script')
				.use('linariaLoader')
				.loader('@linaria/webpack5-loader')
				.options({
					sourceMap: process.env.NODE_ENV !== 'production'
				});
			if (process.env.NODE_ENV !== 'development') {
				chain.mode('production');
				chain.optimization.minimize(true);
				chain.plugin('terser').use(TerserPlugin, [
					{
						extractComments: false,
						parallel: true,
						terserOptions: {
							output: {
								comments: false
							},
							compress: {
								pure_funcs: ['console.log']
							}
						}
					}
				]);
			}
		}
	},
	h5: {
		publicPath: '/',
		staticDirectory: 'static',
		// esnextModules: ['nutui-react'],
		postcss: {
			pxtransform: {
				enable: true,
				config: {
					selectorBlackList: ['nut-']
				}
			},
			autoprefixer: {
				enable: true,
				config: {}
			},
			cssModules: {
				enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
				config: {
					namingPattern: 'module', // 转换模式，取值为 global/module
					generateScopedName: '[name]__[local]___[hash:base64:5]'
				}
			}
		},
		webpackChain(chain, webpack) {
			chain.module
				.rule('script')
				.use('linariaLoader')
				.loader('@linaria/webpack5-loader')
				.options({
					sourceMap: process.env.NODE_ENV !== 'production'
				});
		}
	}
};

module.exports = function (merge) {
	if (process.env.NODE_ENV === 'development') {
		return merge({}, config, require('./dev'));
	}
	return merge({}, config, require('./prod'));
};

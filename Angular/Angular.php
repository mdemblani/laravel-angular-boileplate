<?php

namespace App\Console\Commands\Angular;

use FilesystemIterator;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Arr;
use function base_path;
use function resource_path;

class Angular {

	const SCRIPT_DIRECTORY = 'scripts';
	const VIEW_DIRECTORY = 'views';
	const COMPONENENT_DIRECTORY = '/components';
	const MODULE_DIRECTORY = '/modules';
	const VENDOR_DIRECTORY = '/vendors';
	const INTERCEPTOR_DIRECTORY = '/interceptors';
	const CONFIG_DIRECTORY = '/config';
	const PARTIALS_DIRECTORY = 'partials';

	/**
	 * The instance to the Filesystem class
	 * @var Filesystem
	 */
	private $filesystem;

	/**
	 * The name of the Angular application
	 * @var string
	 */
	private $name;

	/**
	 * The description of the Angular application
	 * @var string
	 */
	private $description;

	/**
	 * The path relative to the resource folder where the scripts would be placed
	 * @var string
	 */
	private $script_path;

	/**
	 * The path relative to the resource folder where the angular template partials
	 * would be placed
	 * @var string
	 */
	private $partial_path;

	/**
	 * Create a new Angular instance
	 * @param string $name
	 * @param string $description
	 * @param array $path
	 */
	public function __construct(string $name, string $description = null, array $path = []) {
		$this->filesystem = new Filesystem;
		$this->name = $name;
		$this->description = $description;
		$this->script_path = isset($path['script']) ? $path['script'] : self::SCRIPT_DIRECTORY;
		$this->partial_path = isset($path['partial']) ? $path['partial'] : self::PARTIALS_DIRECTORY;
	}

	/**
	 * Return the path where the angular scripts would be present.
	 * @param string $path The path to append to the script path
	 * @param bool $relative Indicates whether a relative path is needed
	 * @return string
	 */
	private function getScriptPath(string $path = '', bool $relative = false): string {
		$path = $this->script_path . $path;
		return !$relative ? resource_path($path) : $path;
	}

	/**
	 * Return the path where the angular partials would be present.
	 * @param string $path The path to append to the partial path
	 * @param bool $relative Indicates whether a relative path is needed
	 * @return string
	 */
	private function getPartialPath(string $path = '', bool $relative = false): string {
		$path = $this->partial_path . $path . ($path ? DIRECTORY_SEPARATOR : '');
		return !$relative ? resource_path(self::VIEW_DIRECTORY . DIRECTORY_SEPARATOR . $path) : $path;
	}

	/**
	 * Install the preset.
	 *
	 * @return void
	 */
	public function install() {
		$this->clearDirectories();
		$this->updateNodePackageFile();
		$this->updateComponent();
		$this->updateModule();
		$this->updateVendor();
		$this->updateInterceptor();
		$this->updateConfig();
		$this->updateEntryFile();
		$this->updatePartials();
		$this->updateWebpack();
	}

	/**
	 * Clears the directories where scripts amd partials would be added.
	 */
	private function clearDirectories() {
		$this->filesystem->cleanDirectory($this->getScriptPath());
		$this->filesystem->cleanDirectory($this->getPartialPath());
	}

	private function updateNodePackageFile() {
		$this->updateApplicationName();
		$this->addApplicationDependencies();
		$this->addWebpackDependencies();
		$this->updateNpmScripts();
		$this->removeNodeModules();
	}

	private function updateApplicationName() {
		if (!file_exists(base_path('package.json'))) {
			return;
		}
		$packages = json_decode(file_get_contents(base_path('package.json')), true);
		$packages = ['name' => $this->name, 'description' => $this->description] + $packages;
		file_put_contents(
			base_path('package.json'), json_encode($packages, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . PHP_EOL
		);
	}

	protected function addApplicationDependencies() {

		$packages_to_add = [
			'angular' => '^1.6.6',
			'jquery' => '~3.2.1',
			'@uirouter/angularjs' => '^1.0.11',
			'angular-sanitize' => '^1.6.6',
			'angular-ui-bootstrap' => '^2.5.6',
		];

		$packages_to_reject = [
			'bootstrap-sass',
			'vue',
			'babel-preset-react',
			'react',
			'react-dom',
			'axios',
			'lodash'
		];

		$this->updatePackages($packages_to_add, $packages_to_reject);
	}

	protected function addWebpackDependencies() {

		$packages_to_add = [
			'autoprefixer' => '^7.1.6',
			'babel-core' => '^6.26.0',
			'babel-loader' => '^7.1.2',
			'babel-plugin-angularjs-annotate' => '^0.8.2',
			'babel-polyfill' => '^6.26.0',
			'babel-preset-env' => '^1.6.1',
			'css-loader' => '^0.28.7',
			'dotenv' => '^4.0.0',
			'extract-text-webpack-plugin' => '^3.0.2',
			'html-loader' => '^0.5.1',
			'node-sass' => '^4.5.3',
			'path' => '^0.12.7',
			'postcss-loader' => '^2.0.8',
			'sass-loader' => '^6.0.6',
			'style-loader' => '^0.19.0',
			'webpack' => '^3.8.1',
			'webpack-bundle-analyzer' => '^2.9.0',
			'webpack-dev-server' => '^2.9.3',
			'ng-annotate-loader' => '^0.6.1'
		];

		$packages_to_reject = [
			'cross-env',
			'laravel-mix'
		];

		$this->updatePackages($packages_to_add, $packages_to_reject);
	}

	/**
	 * Update the 'package.json' file.
	 *
	 * @return void
	 */
	private function updatePackages(array $packages_to_add = [], array $packages_to_reject = []) {
		if (!file_exists(base_path('package.json'))) {
			return;
		}
		$packages = json_decode(file_get_contents(base_path('package.json')), true);
		$packages['devDependencies'] = $packages_to_add + Arr::except($packages['devDependencies'], $packages_to_reject);
		ksort($packages['devDependencies']);
		file_put_contents(
			base_path('package.json'), json_encode($packages, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . PHP_EOL
		);
	}

	/**
	 * Add new NPM scripts to Compilation, Build and Deployment
	 * @return void
	 */
	private function updateNpmScripts() {
		if (!file_exists(base_path('package.json'))) {
			return;
		}

		$packages = json_decode(file_get_contents(base_path('package.json')), true);
		$packages['scripts'] = $this->updateScriptsArray($packages['scripts']);
		file_put_contents(
			base_path('package.json'), json_encode($packages, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . PHP_EOL
		);
	}

	protected function updateScriptsArray(array $scripts): array {
		return [
			'start' => 'npm run hot',
			'hot' => 'cross-env NODE_ENV=development node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --hot --config webpack.server.js --open --watch --progress --info',
			'dev' => 'npm run development',
			'development' => 'cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config webpack.config.js',
			'watch' => 'cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js -d --watch --progress --config webpack.config.js',
			'prod' => 'npm run production',
			'production' => 'cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --progress --config webpack.config.js'
		];
	}

	/**
	 * Remove the installed Node modules.
	 *
	 * @return void
	 */
	protected function removeNodeModules() {
		$this->filesystem->deleteDirectory(base_path('node_modules'));
		$this->filesystem->delete(base_path('package-json.lock'));
	}

	private function updateComponent() {
		$target = $this->getScriptPath(static::COMPONENENT_DIRECTORY);
		$this->copyDirectory(__DIR__ . '/stubs/boilerplate/components', $target);
	}

	private function updateModule() {
		$target = $this->getScriptPath(static::MODULE_DIRECTORY);
		$this->copyDirectory(__DIR__ . '/stubs/boilerplate/modules', $target);
	}

	private function updateVendor() {
		$target = $this->getScriptPath(static::VENDOR_DIRECTORY);
		$this->copyDirectory(__DIR__ . '/stubs/boilerplate/vendors', $target);
	}

	private function updateInterceptor() {
		$target = $this->getScriptPath(static::INTERCEPTOR_DIRECTORY);
		$this->copyDirectory(__DIR__ . '/stubs/boilerplate/interceptors', $target);
	}

	private function updateConfig() {
		$target = $this->getScriptPath(static::CONFIG_DIRECTORY);
		$this->copyDirectory(__DIR__ . '/stubs/boilerplate/config', $target);
	}

	private function copyDirectory(string $directory, string $destination) {
		if (!$this->filesystem->isDirectory($directory)) {
			return false;
		}
		// If the destination directory does not actually exist, we will go ahead and
		// create it recursively, which just gets the destination prepared to copy
		// the files over. Once we make the directory we'll proceed the copying.
		if (!$this->filesystem->isDirectory($destination)) {
			$this->filesystem->makeDirectory($destination, 0777, true);
		}
		$items = new FilesystemIterator($directory, FilesystemIterator::SKIP_DOTS);
		foreach ($items as $item) {
			// As we spin through items, we will check to see if the current file is actually
			// a directory or a file. When it is actually a directory we will need to call
			// back into this function recursively to keep copying these nested folders.
			$target = $destination . DIRECTORY_SEPARATOR . $item->getBasename();
			switch ($item->isDir()) {
				case true:
					$path = $item->getPathname();
					if (!$this->copyDirectory($path, $target)) {
						return false;
					}
					break;
				case false:
					// If the current items is just a regular file, we will just copy this to the new
					// location and keep looping. If for some reason the copy fails we'll bail out
					// and return false, so the developer is aware that the copy process failed.
					$stub = $this->filesystem->get($item->getPathname());
					$stub = static::replaceAppName($stub, $this->name);
					$stub = static::replacePartialPath($stub, $this->getPartialPath('', true));
					$this->filesystem->put($target, $stub);
					break;
			}
		}
		return true;
	}

	private function updatePartials() {
		$path = $this->getPartialPath();
		$this->filesystem->copyDirectory(__DIR__ . '/stubs/boilerplate/partials', $path);
	}

	private function updateEntryFile() {
		$path = $this->getScriptPath('/app.js');
		$this->filesystem->makeDirectory(dirname($path), 0777, true, true);
		$stub = $this->filesystem->get(__DIR__ . '/stubs/boilerplate/app.js');
		$this->filesystem->put($path, static::replaceAppName($stub, $this->name));
	}

	/**
	 * Update the Webpack configuration.
	 *
	 * @return void
	 */
	protected function updateWebpack() {
		@unlink(base_path('webpack.mix.js'));
		// Copy Webpack Config file
		$stub = $this->filesystem->get(__DIR__ . '/stubs/boilerplate/webpack/webpack.config.js');
		$stub = static::replacePartialPath($stub, $this->getPartialPath('', true));
		$stub = static::replaceScriptPath($stub, $this->getScriptPath('', true));
		$this->filesystem->put(base_path('webpack.config.js'), $stub);

		// Copy Webpack Server file
		$stub = $this->filesystem->get(__DIR__ . '/stubs/boilerplate/webpack/webpack.server.js');
		$stub = static::replacePartialPath($stub, $this->getPartialPath('', true));
		$stub = static::replaceScriptPath($stub, $this->getScriptPath('', true));
		$this->filesystem->put(base_path('webpack.server.js'), $stub);
	}

	/**
	 *
	 * @param type $stub
	 * @param type $name
	 * @return type
	 */
	protected function replaceAppName(&$stub, $name) {
		$stub = str_replace(['DUMMYAPPNAME'], [$name], $stub);
		return $stub;
	}

	/**
	 *
	 * @param string $stub
	 * @param string $name
	 * @return string
	 */
	protected function replacePartialPath(&$stub, $name): string {
		$stub = str_replace(['DUMMYPARTIALPATH'], [$name], $stub);
		return $stub;
	}

	/**
	 *
	 * @param string $stub
	 * @param string $name
	 * @return string
	 */
	protected function replaceScriptPath(&$stub, $name): string {
		$stub = str_replace(['DUMMYSCRIPTPATH'], [$name], $stub);
		return $stub;
	}

}

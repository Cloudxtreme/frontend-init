# README

## Features

- HTML5 templated index.htm
- Latest stable releases wired in (using Bower): Twitter Bootstrap 3, jQuery, Modernizr
- Gulp setup with the following setup:
    - SCSS compiling using libsass (including autoprefixer)
    - Javascript minification and ready-to-enable concat
    - Image optimisation using imagemin
    - Auto-refreshing dev server using gulp-connect
    - OS-level notification of errors & config so that the watcher continues running
- Gitignore file setup for NodeJS, Python, and Webstorm

## Installation

0. Check you have the required dependencies: Node ≥ v0.10 & npm ≥ 2.1.5 `node -v && npm -v`
1. Clone the project `git clone https://github.com/supahfunk/frontend-init.git`
2. Install NodeJS dependencies `npm install -d`

## Usage

1. Compile files, start watching files, and start dev server `npm start`
2. Open the dev server in your brower `localhost:8080` also available on the network using `ComputerName.local:8080`

## License

supahfunk/frontend-init is released under the MIT license.
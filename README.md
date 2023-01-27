# Wavefront Documentation

## Install Required Software

1. Follow the instructions to [install Jekyll](https://jekyllrb.com/docs/installation/).
1. `cd` to the repository directory and run the following commands:
    ```shell
    $ cd docs
    $ sudo gem install bundler
    $ bundle install
    ```
1. Stay in the repository directory and clone the required submodules (which basically include the README.md of 
Wavefront public repositories into the official documentation)
    ```shell
    $ git submodule init
    $ git submodule update
    ```

## Run and View Site Locally

1. Run Jekyll with the following command:
   ```shell
   $ bundle exec jekyll server --incremental
   ```
1. Go to url [http://localhost:4000/](http://localhost:4000/). The host and port are set in [_config.yml](_config.yml).

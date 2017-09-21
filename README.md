# Wavefront Documentation

## Install Required Software

1. Install [Ruby](https://www.ruby-lang.org/en/documentation/installation/) if you don't have it already.
1. `cd` to the repository directory and run the following commands:
    ```shell
    $ cd docs
    $ sudo gem install bundler
    $ sudo gem install jekyll
    $ sudo gem install nokogiri -v '1.7.1'
    $ bundle install
    ```

## Run and View Site Locally

1. Run Jekyll using the following command:
   ```shell
   $ bundle exec jekyll serve
   ```
1. Go to [http://localhost:4000/](http://localhost:4000/). The host and port are set in [_config.yml](_config.yml).
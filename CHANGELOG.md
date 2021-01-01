# Change Log

All notable changes to the "vscode-url-title-resolver" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [1.1.0]

### Added

- Icon for extension

### Changed

- Documentation

## [1.0.0]

- Initial release
    - Works with all plain URLs and incomplete Markdown links (e.g. `[](https://example.com)`) in selection
    - Requests HTML pages to extract title HTML elements
    - Sanitizes title text (trim and compact whitespace, replace HTML entities)
    - Summary after completion

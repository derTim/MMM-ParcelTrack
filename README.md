# MMM-ParcelTrack
ParcelTrack.de based Tracking Module for MagicMirror<sup>2</sup>

## Example

| ![](.github/example.jpg) | ![](.github/example2.jpg) |

## Dependencies
  * An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
  * npm
  * [jsdom](https://www.npmjs.com/package/jsdom)
  * [async](https://www.npmjs.com/package/async)
  * [request](https://www.npmjs.com/package/request)

## Installation
 1. Clone this repo into `~/MagicMirror/modules` directory.
 2. Run command `npm install` in `~/MagicMirror/modules/MMM-ParcelTrack` directory, to install all dependencies. This will need a couple of minutes.
 3. Configure your `~/MagicMirror/config/config.js`:

     ```
     {
        module: 'MMM-ParcelTrack',
        position: 'bottom_left',
        config: {
          user_id: 'a72c45e368',
          updateInterval: 600000
        }
     }
     ```

## Informations about ParcelTrack
  * You have to install the iOS/Android App first, and get your user_id from the app settings.

## Config Options
| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `user_id` | REQUIRED | Your ParcelTrack user_id |
| `format` | `false` | Displays relative date format, for absolute date format provide a string like `'DD:MM HH:mm'` [All Options](http://momentjs.com/docs/#/displaying/format/) |
| `updateInterval` | `600000` (10 minutes) | Interval new data should be fetched. |

#!/usr/bin/env python3

"""
Download MapBox tiles covering the specified region at all specified zoom
levels. The MapBox Static Tiles API allows up to 2,000 requests per minute and
200,000 monthly requests. Tiles are provided in JPEG format.

    https://docs.mapbox.com/api/maps/#static-tiles
    https://www.mapbox.com/pricing/#maps

The MapBox Static Tiles API uses the Slippy Map Tilenames API to format files
as z/x/y or zoom, column, and row, respectively.

    https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames

To use this script, first update config.py with top (lat), right (lon), bottom
(lat), and left (lon) specifying boundaries for the desired region, as well as
keys for the minZ and maxZ zoom levels.

The script will get all tiles in the region at each zoom level using the file
containing the provided access token.

    python3 get_mapbox_tiles.py token out

For a minimal purple style, use the MapBox style "Ice Cream" by Maya Gao.

    python3 get_mapbox_tiles.py --style=cj7t3i5yj0unt2rmt3y4b5e32 token out

A typical region for our app has 21,845 tiles. Or, if two top-level regions are
needed, then 43,690 tiles will be downloaded in total.
"""

import argparse
import math
import os
import time
import urllib.request

from urllib.error import HTTPError

from config import upper, left, lower, right, min_zoom, max_zoom

# Static Tiles API: https://docs.mapbox.com/api/maps/#static-tiles
URL_TEMPLATE = 'https://api.mapbox.com/styles/v1/{username}/{style}/tiles/{tilesize}/{z}/{x}/{y}{double}?access_token={access_token}'
# Static Tiles API returns tiles in JPEG format
FILENAME_TEMPLATE = 'd{}_x{}_y{}.jpg'

def deg2num(lat_deg, lon_deg, zoom):
    """Convert longitude, latitude, and zoom level to a tile number.

        https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Python
    """
    lat_rad = math.radians(lat_deg)
    n = 2.0 ** zoom
    xtile = int((lon_deg + 180.0) / 360.0 * n)
    ytile = int((1.0 - math.asinh(math.tan(lat_rad)) / math.pi) / 2.0 * n)
    return (xtile, ytile)

def num2deg(xtile, ytile, zoom):
    """Convert xtile, ytile, and zoom level to a latitude and longitude.

        https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Python
    """
    n = 2.0 ** zoom
    lon_deg = xtile / n * 360.0 - 180.0
    lat_rad = math.atan(math.sinh(math.pi * (1 - 2 * ytile / n)))
    lat_deg = math.degrees(lat_rad)
    return (lat_deg, lon_deg)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Download tiles via the MapBox API.')
    parser.add_argument('token_file', help='File containing the MapBox API access token')
    parser.add_argument('output_dir', help='Output directory for tiles')
    parser.add_argument('--username', help='MapBox username', default='mapbox')
    parser.add_argument('--style', help='MapBox style ID', default='streets-v11')
    parser.add_argument('--tilesize', help='MapBox tile size {256|512}', default='256')
    parser.add_argument('--double', help='Render the tile @2x scale factor', action='store_const', const='@2x', default='')
    parser.add_argument('--keep-num', help='Keep x and y Slippy Map Tilenames', action='store_true')
    args = parser.parse_args()

    # Extend the coordinates to the boundaries of the tiles at the min zoom
    print(upper)
    print(lower)
    ulx, uly = deg2num(upper, left, min_zoom)
    upper, left = num2deg(ulx, uly, min_zoom)
    lrx, lry = deg2num(lower, right, min_zoom)
    lower, right = num2deg(lrx + 1, lry + 1, min_zoom)
    print('ROOT_ULLAT = {}'.format(upper))
    print('ROOT_ULLON = {}'.format(left))
    print('ROOT_LRLAT = {}'.format(lower))
    print('ROOT_LRLON = {}'.format(right))
    print('ROOT_LAT   = {}'.format((upper + lower) / 2))
    print('ROOT_LON   = {}'.format((left + right) / 2))
    if input('Continue? [y] ').lower() not in ('y', 'yes'):
        exit(1)

    with open(args.token_file) as f:
        token = f.readline()

    os.makedirs(args.output_dir, exist_ok=True)

    for z in range(min_zoom, max_zoom + 1):
        ulx, uly = deg2num(upper, left, z)
        lrx, lry = deg2num(lower, right, z)
        print('ul: {}/{}/{} -> lr: {}/{}/{}'.format(z, ulx, uly, z, lrx, lry))
        num_tiles = (lrx - ulx) * (lry - uly)
        if input('Get {} tiles? [y] '.format(num_tiles)).lower() not in ('y', 'yes'):
            continue

        tiles_received = 0
        for x in range(ulx, lrx):
            for y in range(uly, lry):
                url = URL_TEMPLATE.format(
                        access_token=token,
                        username=args.username,
                        style=args.style,
                        tilesize=args.tilesize,
                        double=args.double,
                        z=z, x=x, y=y)

                if args.keep_num:
                    filename = FILENAME_TEMPLATE.format(z, x, y)
                else:
                    filename = FILENAME_TEMPLATE.format(z - min_zoom, x - ulx, y - uly)
                filepath = os.path.join(args.output_dir, filename)

                attempt = 0
                while not os.path.isfile(filepath) and attempt < 6:
                    attempt += 1
                    try:
                        urllib.request.urlretrieve(url, filepath)
                        tiles_received += 1
                    except HTTPError as err:
                        if err.code == 429:
                            print('Err 429: API rate limit exceeded. Retrying in 10 seconds...')
                            time.sleep(10)
                        else:
                            raise
        print('Rec {} tiles.'.format(tiles_received))

# Moonlit Hollow

A small, atmospheric 2D platformer set in a moonlit forest. Follow the starlight, explore ancient ruins, and guide a young woodland explorer to the glowing gate.

Built with **HTML, CSS, and vanilla JavaScript**. No framework, package installation, API keys, or build step is required to serve the game.

<img width="1264" height="892" alt="preview" src="https://github.com/user-attachments/assets/d82bf4c8-7ddc-4391-8252-a0e491d59342" />


## Features

- One complete forest level with optional elevated routes
- 64 collectibles, including moon crystals
- Three scenic backgrounds with parallax scrolling
- Player poses, forest props, creatures, and moss-covered platforms
- Responsive jumps with coyote time, input buffering, and variable height
- Enemy stomping, three-heart health, and an optional heart pickup
- A lantern checkpoint that restores health and saves progress during the run
- Pause, restart, sound effects, fullscreen, and touch controls

## Play locally

Download or clone the repository. Open a terminal in the folder containing `index.html` and start a static web server. With Python 3 installed:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

On Windows, you can also use:

```powershell
py -m http.server 8000 --bind 127.0.0.1
```

Then open [http://localhost:8000](http://localhost:8000) in a modern browser. Keep the `assets` directory beside `index.html`.

Use a local server for the source version: opening `index.html` directly can block the canvas from reading image pixels in some browsers. For a single file you can open directly, see **Build an offline copy** below.

## Controls

| Action | Controls |
| --- | --- |
| Move | A / D or left / right arrows |
| Jump | Space, W, or up arrow |
| Shorter jump | Release the jump button early |
| Pause / resume | Escape or P |
| Sound effects | Sound button; initially off |
| Fullscreen | Full screen button |
| Touch devices | Onscreen directional and jump buttons |

Reach the glowing gate at the far end of the forest. Collectibles are optional. Jump on creatures to defeat them; touching them from the side costs a heart. Falling returns you to the start or your latest checkpoint and costs a heart. After losing all hearts, choose to continue from the lantern or begin a new journey.

The lantern sanctuary restores all three hearts. A heart pickup on the elevated path near the sanctuary restores one missing heart. Progress is kept only for the current run; reloading starts a fresh journey.

A direct traversal takes approximately 45 seconds. Exploring the upper paths is intended to take 1–2 minutes.

## Upload to GitHub

1. Create a repository, for example `moonlit-hollow`.
2. Upload the **contents of this folder** into the repository root. `index.html` and `README.md` should appear immediately when you open the repository, with `assets/`, `docs/`, `tests/`, and `tools/` beside them.
3. Keep all filenames and folder names unchanged, including the hidden `.gitignore`, `.gitattributes`, and `.nojekyll` files.
4. Commit the uploaded files. The README and preview will appear on the repository page.

Extract the ZIP first; uploading only the ZIP will not create a playable site. You can use the GitHub website or GitHub Desktop to upload the extracted files.

## Publish with GitHub Pages

This project is a static site and can be served directly from the repository.

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select the branch containing the files, usually **main**, and choose **/(root)**.
4. Click **Save**. When deployment finishes, open the site address shown by GitHub.

See the [official GitHub Pages publishing instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) for availability and configuration details.

## Project structure

```text
moonlit-hollow-github/
├── index.html                 # Page layout, menus, and game canvas
├── style.css                  # Responsive styling
├── engine.js                  # Level data, physics, collisions, and game state
├── game.js                    # Rendering, artwork loading, input, sound, and UI
├── assets/                    # 13 original artwork images used by the game
├── docs/
│   └── preview.png            # README screenshot
├── tests/
│   └── game.test.cjs          # Gameplay engine checks
├── tools/
│   └── build_standalone.py    # Creates a single-file offline version
├── README.md
├── .gitignore
├── .gitattributes
└── .nojekyll
```

## Run the gameplay checks

With Node.js installed, run this from the project folder:

```sh
node tests/game.test.cjs
```

No dependencies are required. The checks cover ground collision, jumping, coyote time, jump buffering, heart pickups, checkpoint recovery, enemy stomping, damage cooldown, every required gap, and an automated traversal to the finish.

## Build an offline copy

With Python 3 installed, run:

```sh
python tools/build_standalone.py
```

On Windows, `py tools/build_standalone.py` also works. The script writes `dist/Play Moonlit Hollow.html`, embedding the styles, scripts, and artwork. Open that file in a modern browser to play without a server. The generated `dist/` folder is excluded from Git because it duplicates the source and images.

## Customize the game

- Change the ground, platforms, collectibles, creatures, and movement settings in `engine.js`.
- Change drawing, sound, input handling, and menus in `game.js`.
- Change the page text in `index.html` and its appearance in `style.css`.
- If replacing artwork, update its filename and crop coordinates in `game.js`.

## Artwork credit

Artwork comes from [Skai Generated's forest platformer prompt pack](https://docs.google.com/document/d/1hJmrpvHGU8yrIjPAUNc-2WOwgx1fT5b5wUYg-ptucW8/edit). The supplied images are used directly. Individual sprites are selected from the sheets, and their baked-in checkerboard backgrounds are removed during canvas rendering.

No asset redistribution license was supplied with the reference document, and this repository does not claim ownership of its artwork. Confirm the artwork's usage rights before publicly distributing or commercially using it. No open-source license has been assigned to this project; any license added later should distinguish the game code from third-party artwork.

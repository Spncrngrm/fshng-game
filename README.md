# FSHNG


    git add .
    git commit -m "see caught fish, net storage, view the net, remove fish from the net, saving to web browser"
    git push


FSHNG is a playful and educational fishing game built with Angular 19. Catch fish, manage your net, and learn sorting algorithms through visual interaction in a lively aquarium setting.

---

## Gameplay Overview

### Catching Fish
Each time you cast your line, five bubbles appear randomly on the screen:
- Each bubble is smaller than the last and disappears more quickly.
- You must click all five in order before they vanish.
- If you miss even one, the fish escapes, and you must recast.

### Net Mechanics
- Your net has a limited weight capacity.
- Every fish you catch has the following properties:
  - `weight (kg)`
  - `price ($)`
  - `length (cm)`
  - `color`
  - `rarity`
- You can either:
  - Sell fish from your net for money.
  - Transfer fish to your aquarium for sorting and display.

---

## Aquarium Mode (Sorting Visualizer)

Your aquarium serves as an interactive space for visualizing classic sorting algorithms using the fish you’ve caught.

### Sorting Options
You can sort your fish based on:
- Weight
- Price
- Length
- Color
- Rarity

Choose a sorting algorithm to apply:
- Bubble Sort
- Selection Sort
- Insertion Sort
- Merge Sort
- Quick Sort
- Cocktail Shaker Sort (Champagne Sort)

Fish visibly swap positions when sorting begins to demonstrate how the algorithm works.

---

## Progression and Upgrades

Selling fish earns you in-game currency. Use it to upgrade:
- Net capacity
- Number of aquarium tanks
- Aquarium customization (themes, lighting, décor)
- Unlockable sorting algorithm visualizations
- Aquarium automation (auto-sort, sort scheduler)

---

## Fish Collection

There are 50 unique fish in the game. Each has a distinct look and set of stats.

Example fish:
- `Basicfish` — From image `f00_basic.png`
- `Clownfish` — From image `f04_clown.png`
- `Pufferfish` — From image `f11_puffer.png`

Additional fish include:
- Bubbler: 7.72kg, $16.01, 108.3cm, Silver, Uncommon
- Glimmerfish: 2.90kg, $93.62, 39.4cm, Red, Rare
- Shadowfin: 7.01kg, $96.94, 103.5cm, Silver, Legendary

And 47 others, each generated with randomized yet balanced stats.

---

## Tech Stack

- Angular 19
- HTML5 + CSS3 (animations and transitions)
- TypeScript
- JSON-based data structures for fish and upgrades
- Canvas or DOM rendering for sorting animations

---

| #  | Name             | Price per kg ($/kg) | Length (cm) | Color  | Rarity     | Weight Range    |
|----|------------------|----------------------|--------------|--------|------------|-----------------|
| 1  | Bubbler          | 2.07                 | 108.3        | Silver | Uncommon   | Large (5–8kg)   |
| 2  | Coralfin         | 5.53                 | 112.6        | Silver | Rare       | XL (8kg+)       |
| 3  | Snapjack         | 23.98                | 81.8         | Silver | Uncommon   | Medium (2–5kg)  |
| 4  | Glimmerfish      | 32.28                | 39.4         | Red    | Rare       | Medium (2–5kg)  |
| 5  | Shadowfin        | 13.83                | 103.5        | Silver | Legendary  | Large (5–8kg)   |
| 6  | Sunscale         | 7.95                 | 62.3         | Orange | Common     | XL (8kg+)       |
| 7  | Blazetail        | 14.73                | 88.9         | Yellow | Legendary  | Medium (2–5kg)  |
| 8  | Frostgill        | 5.15                 | 40.0         | Purple | Rare       | XL (8kg+)       |
| 9  | Thunderfin       | 5.85                 | 20.7         | Yellow | Legendary  | Large (5–8kg)   |
| 10 | Leafy Lurker     | 28.89                | 92.0         | Orange | Legendary  | Small (0–2kg)   |
| 11 | Pebblefish       | 5.7                  | 83.5         | Yellow | Rare       | Medium (2–5kg)  |
| 12 | Drift Dart       | 0.73                 | 14.0         | Blue   | Uncommon   | XL (8kg+)       |
| 13 | Spiketail        | 7.78                 | 30.9         | Black  | Common     | Medium (2–5kg)  |
| 14 | Neon Swimmer     | 5.3                  | 61.8         | Orange | Rare       | Medium (2–5kg)  |
| 15 | Mudhopper        | 9.61                 | 40.0         | Red    | Rare       | XL (8kg+)       |
| 16 | Crystal Pike     | 23.46                | 114.4        | Black  | Uncommon   | Medium (2–5kg)  |
| 17 | Zebrafish        | 16.75                | 57.3         | Silver | Epic       | Large (5–8kg)   |
| 18 | Goldstripe       | 46.79                | 111.0        | Red    | Epic       | Small (0–2kg)   |
| 19 | Inkblot          | 10.65                | 50.9         | Green  | Legendary  | Large (5–8kg)   |
| 20 | Vortex Eel       | 18.22                | 107.4        | Silver | Legendary  | Medium (2–5kg)  |
| 21 | Tiny Terror      | 15.97                | 65.4         | Yellow | Common     | Large (5–8kg)   |
| 22 | Moon Glider      | 12.41                | 51.9         | Purple | Legendary  | Medium (2–5kg)  |
| 23 | Quillfish        | 12.9                 | 41.0         | Yellow | Epic       | Large (5–8kg)   |
| 24 | Glassie          | 42.68                | 55.0         | White  | Uncommon   | Small (0–2kg)   |
| 25 | Tanglefin        | 18.34                | 103.6        | White  | Common     | Medium (2–5kg)  |
| 26 | Swishwhirl       | 4.22                 | 57.3         | Yellow | Uncommon   | XL (8kg+)       |
| 27 | Velvet Ray       | 8.51                 | 13.5         | Red    | Legendary  | Medium (2–5kg)  |
| 28 | Chompfin         | 3.6                  | 84.9         | White  | Common     | Medium (2–5kg)  |
| 29 | Glowdrift        | 11.34                | 73.5         | Orange | Common     | Large (5–8kg)   |
| 30 | Speckle Pike     | 4.85                 | 114.6        | Yellow | Rare       | XL (8kg+)       |
| 31 | Rainbow Snap     | 7.23                 | 11.1         | Blue   | Legendary  | Large (5–8kg)   |
| 32 | Duskgill         | 3.16                 | 93.7         | Red    | Rare       | Medium (2–5kg)  |
| 33 | Stormrunner      | 0.89                 | 46.7         | Silver | Legendary  | Large (5–8kg)   |
| 34 | Twinklefish      | 16.96                | 93.8         | Purple | Epic       | Medium (2–5kg)  |
| 35 | Bubble Dart      | 11.51                | 25.3         | Silver | Legendary  | Large (5–8kg)   |
| 36 | Reedflicker      | 27.93                | 56.5         | Blue   | Rare       | Medium (2–5kg)  |
| 37 | Silverstream     | 2.15                 | 78.6         | Silver | Epic       | Large (5–8kg)   |
| 38 | Firetip          | 7.16                 | 78.9         | Silver | Uncommon   | Medium (2–5kg)  |
| 39 | Spottail         | 2.22                 | 60.1         | Orange | Legendary  | Medium (2–5kg)  |
| 40 | Silt Slither     | 71.08                | 59.0         | Yellow | Uncommon   | Small (0–2kg)   |
| 41 | Marblite         | 29.92                | 10.7         | Purple | Uncommon   | Small (0–2kg)   |
| 42 | Jetdart          | 12.95                | 56.0         | Orange | Rare       | Large (5–8kg)   |
| 43 | Crimson Carp     | 11.15                | 31.3         | Yellow | Rare       | Large (5–8kg)   |
| 44 | Skydart          | 7.02                 | 119.4        | Silver | Legendary  | Large (5–8kg)   |
| 45 | Whistle Pike     | 12.65                | 104.1        | Red    | Uncommon   | Medium (2–5kg)  |
| 46 | Oasis Jumper     | 5.66                 | 47.6         | Yellow | Epic       | Medium (2–5kg)  |
| 47 | Mossback         | 4.21                 | 21.5         | Yellow | Uncommon   | Medium (2–5kg)  |
| 48 | Ashfluke         | 3.4                  | 30.3         | Purple | Rare       | Small (0–2kg)   |
| 49 | Dune Fish        | 13.02                | 88.6         | Purple | Rare       | Large (5–8kg)   |

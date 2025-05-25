# Index
- [Site Configuration](#site-configuration---datajson)
    - [Structure Overview](#structure-overview)
        - [Root Object](#root-object)
        - [SiteName](#sitename)
        - [Collectables](#collectables)
        - [Fields](#fields)
            - [Row](#row)
            - [input](#input)
                - [Required keys](#required-keys)
                - [Optional keys](#optional-keys)
                - [Examples](#examples)
        - [Carousel](#carousel)
        - [Language](#language)
            - [In data.json](#in-datajson)
            - [In label.json](#in-labeljson)
    - [SCSS Compilation](#scss-compilation)
        - [Why might the CSS be missing after cloning?](#why-might-the-css-be-missing-after-cloning)
        - [How to generate the CSS](#how-to-generate-the-css)
        - [Requirements](#requirements)

# Site Configuration - [data.json](json/data.json)

This JSON file defines the dynamic structure of the web form used by the site, as well as the carousel configuratio

## Structure Overview

### Root Object

The file consists of a **root** `object` with the following **required** keys:
> ⚠️ All of the following keys are **mandatory**:

- [siteName](#sitename)
- [collectables](#collectables)
- [fields](#fields)
- [carousel](#carousel)

```json
{
    "siteName": "str",
    "collectables":{...},
    "field":[...],
    "carousel":{...}
}
```

### SiteName

A `string` used as the site name and page title.

### Collectables

An `object` that defines the name of the collected items in each supported [language](#languague).

```json
{
    ...,
    "collectables":{
        "en": "str",
        "fr": "str"
    },
    ...
}
```

### Fields

An `array` of [rows](#row). Each [row](#row) represents a single line of inputs in the form.

```json
{
    ...,
    "fields":[
        {...},
        {...},
        {...}
    ],
    ...
}
// This form will have 3 rows
```

#### Row

A row is an `object` where each key represents an [input](#input). Each [input](#input) is itself an `object` defining a form field.


```json
{
    ...,
    "fields":[
        {
            "key1": {...},
            "key2": {...}
        },
        ...
    ],
    ...
}
// This row has two columns (two inputs)
```

#### input

##### Required keys
Each input must at minimum include the following keys:
> ⚠️ All of the following keys are **mandatory**:
- id
- required
- cardPositon
- label

|Key|Type|Description|
|-:|-|-|
|id|str|HTML ID of the input|
|required|bool|Is the input required?|
|cardPosition|str|Placement in the card: "header" or "body"|
|label|object|	Multilingual labels for the input (see [Language](#language))

```json
{
    ...,
    "fields":[
        {
            "key1": {
                "id": "str",
                "required": "bool",
                "cardPosition": "str", // "header" or "body" 
                "label":{
                    "en": "str",
                    "fr": "str"
                }
            },
            ...
        },
        ...
    ],
    ...
}
```
##### Optional keys

Additional properties allow you to control input behavior and appearance:

|Key|Type|Description|Constraint|
|-:|-|-|-|
|storageKey|str|Key used to store values in localStorage|None|
|otherId|str|Turns the input into a dropdown with a free text option|- **Mutually exclusive** with `choiceId` and `textarea`. <br>- Requires `storageKey`.|
|choiceId|str|Enables autocomplete with multi-choice support|- **Mutually exclusive** with `otherId` and `textarea`.<br> - Requires `storageKey`.|
|textarea|int|Converts the input into a multi-line textarea|**Mutually exclusive** with `choiceId` and `otherId`.|
|nbColumn|int|Adjusts layout by simulating (nbColumn - 1) extra inputs|None|
|cardRole|str|Defines appearance (title, subtitle)|Requires `cardPosition` set to `"header"`|
> ⚠️ You must use only **one** of `choiceId`, `otherId`, or `textarea` per input. They are not compatible with each other.


#####  Examples
1. With **storageKey** (standard input + localStorage):
    ```json
    {
        ...,
        "fields":[
            {
                "key1": {
                    "id": "str",
                    "required": "bool",
                    "cardPosition": "str",
                    "storageKey":"str",
                    "label":{
                        "en": "str",
                        "fr": "str"
                    }
                },
                ...
            },
            ...
        ],
        ...
    }
    ```
2. With **otherId** (Dropdown with “Other” option):
    ```json
    {
        ...,
        "fields":[
            {
                "key1": {
                    "id": "str",
                    "required": "bool",
                    "cardPosition": "str",
                    "storageKey":"str",
                    "otherId":"str",
                    "label":{
                        "en": "str",
                        "fr": "str"
                    }
                },
                ...
            },
            ...
        ],
        ...
    }
    ```
3. With **choiceId** (Multi-choice input):
    ```json
    {
        ...,
        "fields":[
            {
                "key1": {
                    "id": "str",
                    "required": "bool",
                    "cardPosition": "str",
                    "storageKey":"str",
                    "choiceId":"str",
                    "label":{
                        "en": "str",
                        "fr": "str"
                    }
                },
                ...
            },
            ...
        ],
        ...
    }
    ```
4. With **textarea**:
    ```json
    {
        ...,
        "fields":[
            {
                "key1": {
                    "id": "str",
                    "required": "bool",
                    "cardPosition": "str",
                    "textarea": "int",
                    "label":{
                        "en": "str",
                        "fr": "str"
                    }
                },
                ...
            },
            ...
        ],
        ...
    }
    ```
5. with **ndColumn** (Multi-column layout simulation):
    ```json
    {
        ...,
        "fields":[
            {
                "key1": {
                    "id": "str",
                    "required": "bool",
                    "cardPosition": "str",
                    "nbColumn":"int",
                    "label":{
                        "en": "str",
                        "fr": "str"
                    }
                },
                ...
            },
            ...
        ],
        ...
    }
    ```
6. With **cardRole** (Card header roles title and subtitle):
    ```json
    {
        ...,
        "fields":[
            {
                "key1": {
                    "id": "str",
                    "required": "bool",
                    "cardPosition": "header",
                    "cardRole": "title"
                    "label":{
                        "en": "str",
                        "fr": "str"
                    }
                },
                "key2": {
                    "id": "str",
                    "required": "bool",
                    "cardPosition": "header",
                    "cardRole": "subtitle",
                    "label":{
                        "en": "str",
                        "fr": "str"
                    }
                }
                ...
            },
            ...
        ],
        ...
    }
    ```

### Carousel

An `object` describing visual carousel behavior:

|Nom|Type|Description|
|-:|-|-|
|slidesToScroll|int|Number of slides to scroll per button click|
|slidesVisible|int|Number of slides shown at once|
|loop|bool|Enables looping behavior(do not combine with infinite)|
|infinite|bool|Enables infinite scroll (do not combine with loop)|
|slideIndicator|bool|ù£Show pagination indicator|

> ⚠️ You cannot set both **loop** and **infinite** to **true** simultaneously.

```json
{
    ...,
    "carousel":{
        "slidesToScroll": "int",
        "slidesVisible": "int",
        "loop": "bool",
        "infinite": "bool",
        "slideIndicator": "bool"
    }
}
```

### Language

To add a new language, update the following:
#### In [data.json](json/data.json)
- Add translations in:
    - [collectables](#collectables)
    - [input.label](#input)

#### In [label.json](json/label.json)
- Add a new language `object` following the structure of existing ones
- Translate all keys
- Include a flag key with the path to your new flag icon (e.g., img/flag/es.svg)
> You can find svgs for flag here : [flag-icon](https://flagicons.lipis.dev/)

## SCSS Compilation
This project uses **SCSS** (Sass) for styling, compiled with **Dart Sass**. The `.scss` files are automatically transformed into `.css` using a watch script.

### Why might the CSS be missing after cloning?
If you clone this repository from GitHub, it's possible that the `.css` file is missing or outdated. This is because the CSS is generated locally from the SCSS files and may not be versioned to avoid unnecessary conflicts or redundant code.

### How to generate the CSS?
You need to run the appropriate SCSS watch script based on your operating system:
- **On Windows:**
    ```bash
    ./watch.bat
- **On macOS / Linux:**
    ```bash
    ./watch.sh
If `./watch.sh` doesn't execute, you may need to make it executable first:
```bash
chmod +x /path/to/watch.sh
```

These scripts use Dart Sass to compile SCSS files into CSS in real time whenever a change is detected.

### Requirements
Make sure you have Dart Sass installed on your machine. You can install it via:
- npm (universal method):
    ```bash
    npm install -g sass
    ```
- or follow the official installation guide: [sass-lang.com/install](https://sass-lang.com/install)

Once Dart Sass is installed and the watch script is running, any changes made to `.scss` files will automatically be compiled into `.css`.

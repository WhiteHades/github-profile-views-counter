# GitHub Profile Views Counter

Fork deployment for views.mohammedefaz.com.

![GitHub Profile Views Counter](https://user-images.githubusercontent.com/1849174/87816378-dfce8480-c86f-11ea-9ac0-2f7907e1d9d4.png)

<p align="center">
<a href="https://discord.gg/geJF43E"><img src="https://img.shields.io/static/v1?logo=discord&label=&message=Discord&color=36393f&style=flat-square" alt="Discord"></a>
<a href="https://github.com/WhiteHades/github-profile-views-counter/blob/master/LICENSE"><img src="https://img.shields.io/github/license/WhiteHades/github-profile-views-counter.svg?style=flat-square" alt="License"></a>
</p>

## Introduction

This fork is a self-hosted, Next.js version of the classic profile counter.
It is designed to be an analytical instrument for you, not a public scoreboard.
It could be used to see profile views dynamics as result of development activity, blogging or taking part in a conference.

It counts how many times your GitHub profile has been viewed and displays them in your profile, for free.

![profile-views-counter-example](https://user-images.githubusercontent.com/1849174/88077155-9ccc2400-cb83-11ea-8d9c-d18a8b1dc297.png)

## Next.js Deployment (Vercel)

This fork replaces the PHP runtime with a Next.js App Router endpoint for easier Vercel deployments.
The badge endpoint remains at the root URL (`/?username=...`) for drop-in compatibility.

### Environment

```
REPOSITORY=redis
REDIS_URL=redis://localhost:6379/0
```

Optional for local testing:

```
REPOSITORY=file
FILE_STORAGE_PATH=./storage
```

> [!NOTE]
>
> `REPOSITORY=pdo` is not supported in this Next.js build.

### Local Dev

```
npm install
cp .env.example .env
npm run dev
```

Open `/docs` for a styled usage overview.

## Usage

If you want to see big numbers in your profile, deploy a standalone solution to draw any views count you want
without spamming public servers. Everybody knows that any counters could be faked.

> A billion fake profile views doesn't make you a very popular person, it makes you a person with a billion number in the counter.

### Create GitHub profile repository

GitHub magic will happen as soon as you will create a new repository named equally to your username.

![secret-profile-repository](https://user-images.githubusercontent.com/1849174/87852702-f24acb80-c90c-11ea-8247-90ae7de0954d.png)

[Live demo] of [my profile repository].

### Add counter to GitHub profile

You need to add counter in README.md file in your profile repository via Markdown syntax:

```markdown
![](https://views.mohammedefaz.com/?username=your-github-username)
```

> [!NOTE]
>
> Don't forget to replace example `your-github-username` parameter with real value.

## Make it personal

### Color

You can use any valid HEX color or pick from a predefined set of named colors (`cba6f7` is the default).

| color | demo |
| ----- | ---- |
| `brightgreen` | ![](https://img.shields.io/static/v1?label=Profile+views&message=1234567890&color=brightgreen) |
| `green` | ![](https://img.shields.io/static/v1?label=Profile+views&message=1234567890&color=green) |
| `yellow` | ![](https://img.shields.io/static/v1?label=Profile+views&message=1234567890&color=yellow) |
| `yellowgreen` | ![](https://img.shields.io/static/v1?label=Profile+views&message=1234567890&color=yellowgreen) |
| `orange` | ![](https://img.shields.io/static/v1?label=Profile+views&message=1234567890&color=orange) |
| `red` | ![](https://img.shields.io/static/v1?label=Profile+views&message=1234567890&color=red) |
| `blue` | ![](https://img.shields.io/static/v1?label=Profile+views&message=1234567890&color=blue) |
| `grey` | ![](https://img.shields.io/static/v1?label=Profile+views&message=1234567890&color=grey) |
| `lightgrey` | ![](https://img.shields.io/static/v1?label=Profile+views&message=1234567890&color=lightgrey) |
| `blueviolet` | ![](https://img.shields.io/static/v1?label=Profile+views&message=1234567890&color=blueviolet) |
| `ff69b4` | ![](https://img.shields.io/static/v1?label=Profile+views&message=1234567890&color=ff69b4) |

**Named color**

```markdown
![](https://views.mohammedefaz.com/?username=your-github-username&color=green)
```

**Hex color**

```markdown
![](https://views.mohammedefaz.com/?username=your-github-username&color=dc143c)
```

> [!NOTE]
>
> HEX colors should be used without `#` symbol prefix.

### Styles

The following styles are available (`flat` is the default).

| style | demo |
| ----- | ---- |
| `flat` | ![](https://img.shields.io/static/v1?label=Profile+views&message=1234567890&color=007ec6&style=flat) |
| `flat-square` | ![](https://img.shields.io/static/v1?label=Profile+views&message=1234567890&color=007ec6&style=flat-square) |
| `plastic` | ![](https://img.shields.io/static/v1?label=Profile+views&message=1234567890&color=007ec6&style=plastic) |
| `for-the-badge` | ![](https://img.shields.io/static/v1?label=Profile+views&message=1234567890&color=007ec6&style=for-the-badge) |
| `pixel` | this is "invisible" mode for counter. Use it when you want to have counter without of displaying of it |

```markdown
![](https://views.mohammedefaz.com/?username=your-github-username&style=flat-square)
```

### Label

You can overwrite default `Profile views` text with your own label.

![](https://img.shields.io/static/v1?label=PROFILE+VIEWS&message=1234567890&color=007ec6)

```markdown
![](https://views.mohammedefaz.com/?username=your-github-username&label=PROFILE+VIEWS)
```

> [!NOTE]
>
> Replace whitespace with `+` character in multi-word labels.

### Base number

You can provide a `base` number to add to the counter.
This is useful if you are migrating from another service.

For example, a user with 1000 views on another service who wants to migrate to GHPVC will use the following url
to ensure the 1000 views are accounted for:
```markdown
![](https://views.mohammedefaz.com/?username=your-github-username&base=1000)
```

### Abbreviation

You can set the `abbreviated` parameter to `true` if you would like the counter to be abbreviated.

For example, a counter with 12345 views, will be displayed as 12.3K.

![](https://img.shields.io/static/v1?label=Profile+views&message=12.3K&color=007ec6)

```markdown
![](https://views.mohammedefaz.com/?username=your-github-username&abbreviated=true)
```

## FAQ

### Can I see detailed statistics?

This project provides a minimalistic counter only. Use a separate analytics tool if you need detailed insights.

### Why does the counter increase every time the page is reloaded?

This is counter of profile views (page hits), not a counter of unique visitors.
There is no way to get the username, browser user agent or IP address of the visitor because
GitHub proxies all image URLs through the [GitHub Camo service].
In other words, we can only increment the counter for each request from the GitHub proxy server,
we don't know who initiated it.

### Are you making money on it?

No. This fork is a personal deployment.

## License

- `GitHub Profile Views Counter` application is open-sourced software licensed under the [MIT license](LICENSE) by Mohammed Efaz.
- `Eye Octicon` hero image licensed under MIT license by [GitHub, Inc].

[GitHub, Inc]: https://github.com
[Live demo]: https://github.com/WhiteHades
[my profile repository]: https://github.com/WhiteHades/WhiteHades
[GitHub Camo service]: https://github.blog/2010-11-13-sidejack-prevention-phase-3-ssl-proxied-assets/

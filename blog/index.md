---
layout: page
title: Blog
permalink: /blog/
---

## Posts

{% for post in site.posts %}
- [{{ post.title }}]({{ post.url }}) — {{ post.date | date: "%Y-%m-%d" }}
{% endfor %}

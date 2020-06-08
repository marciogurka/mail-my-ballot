{% extends "Base.md" %}

{% set guidance = 'the [Wyoming Secretary of State](https://sos.wyo.gov/Elections/State/AbsenteeVoting.aspx)' %}

{% block body %}
- County: **{{county}}**
- Elections: **{{election}}**
- Affirmation: Per the requirements: I am affirming that I am eligible to vote in the election

{% endblock %}

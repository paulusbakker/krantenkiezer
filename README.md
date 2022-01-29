# Kranten kiezer

**Author:** *Paul Bakker*\
**Version:** *1.0*\
**Date** 30 januari 2022

# Contents 

Contents

Introduction

Download

Versions and dependencies

Installation

Run

Deployment

## Introduction

Kranten Kiezer is a frontend application which gives insight into the amount of publications of the major Dutch newspapers per given search term. 
Registered users can make use of this app.

Kranten Kiezer is a React single page application, apart from React
libraries no other software has been used. For the setup
create-react-app has been used.

## Download

The application can be downloaded from github from
[here](https://github.com/paulusbakker/krantenkiezer)

## Versions and dependencies

The application was built using Webstorm. Find a list of versions of the
software used below

    "axios": "^0.24.0",
    "react": "^17.0.2",
    "react-collapsed": "^3.3.0",
    "react-dom": "^17.0.2",
    "react-hook-form": "^7.22.1",
    "react-icons": "^4.3.1",
    "react-router-dom": "^5.2.0",
    "react-scripts": "5.0.0",
    "recharts": "^2.1.8",
    "web-vitals": "^2.1.2"

## Installation

This is alll covered by the NPM package manager, after downloading the
project, just run

    npm install

Before running the app the user must ask the author for the api key which have to must be entered in the file .env in the top directry of the project.

## Run

Start the application by entering

    npm start
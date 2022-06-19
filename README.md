# Oii Cli

### A simple cli to interface <a ref="https://training.olinfo.it">training.olinfo.it</a>

### Features
- One-time configuration for credentials (via ```oii config```)
- Semi-permanent login (will last up to a month from the first ```oii login```)
- Send submission

### Requisites
- `node >= 16`,
- `npm`

### Installation
- Download the repo

  ```git clone https://github.com/Gulmini/oii-cli.git```

- Enter into repository

  ```cd oii-cli```

- Install package (additional permissions with `sudo` may be needed)

  ```npm i -g```

### Setup
- To configure credentials
  
  ```oii config --username <your_username> --password <your_password>```

  or

  ```mv config.sample.json config.json``` and then fill credentials directly into `config.json`

- To log in
  
  ```oii login```

### Usage
- ```oii --help```
  
  Writes on terminal the guide to use the cli

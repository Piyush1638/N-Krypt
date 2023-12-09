// https://eth-goerli.g.alchemy.com/v2/hH-5PJoT5_F0-EUjxzniFzmcV98OV51V

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: "0.8.0",
  networks:{
    goerli:{
      url: "https://eth-goerli.g.alchemy.com/v2/hH-5PJoT5_F0-EUjxzniFzmcV98OV51V",
      accounts: ['']
    }
  }

}

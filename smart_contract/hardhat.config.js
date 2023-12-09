// https://eth-goerli.g.alchemy.com/v2/hH-5PJoT5_F0-EUjxzniFzmcV98OV51V

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: "0.8.0",
  networks:{
    goerli:{
      url: "https://eth-goerli.g.alchemy.com/v2/hH-5PJoT5_F0-EUjxzniFzmcV98OV51V",
      accounts: ['72bf4dd682df41f47b9b1868b1da6fa31051d1068e12e75c3ff006eaf3ed2a65']
    }
  }

}
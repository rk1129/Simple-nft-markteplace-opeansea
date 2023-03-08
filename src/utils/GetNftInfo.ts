import axios from 'axios';
const moralisUrl = process.env.REACT_APP_MORALIS_API_URL;
const alchemyUrl = process.env.REACT_APP_ALCHEMY_API_URL;
const moralisKey = process.env.REACT_APP_MORALIS_API_KEY;
const chainId = process.env.REACT_APP_CHAIN_ID;
const nftAddress = process.env.REACT_APP_DEFAULT_NFT_ADDRESS;

export const getNftList = async () => {
    const url = `${moralisUrl}/${nftAddress}?chain=${chainId}&format=decimal&limit=10`;
    const nfts = await axios.get(url, {
        headers: {
            accept: 'application/json',
            'X-API-Key': moralisKey,
        },
    });
    const list: any = [];
    nfts.data.result.map((item: any) => {
        list.push({
            contractAddress: item.token_address,
            tokenId: item.token_id,
            tokenType: item.contract_type,
        });
    });
    const result = await axios.post(alchemyUrl as string, {
        tokens: list,
        refreshCache: false,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        },
    });
    return result.data;
};

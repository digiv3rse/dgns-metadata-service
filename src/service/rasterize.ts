import { GoogleAuth } from 'google-auth-library';

const auth = new GoogleAuth();
const grRasterize = 'https://rasterize-digi-official.koyeb.app/rasterize'

export function rasterize(
  contractAddress: string,
  networkName: string,
  tokenId: string
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const client = await auth.getIdTokenClient(grRasterize);
    client
      .request({
        url: grRasterize,
        method: 'POST',
        responseType: 'arraybuffer',
        data: {
          contractAddress,
          networkName,
          tokenId,
        },
      })
      .then((response: any) =>
        resolve(Buffer.from(response.data, 'binary').toString('base64'))
      )
      .catch(({ response }: any) => {
        const { status, statusText } = response;
        reject({ status, statusText });
      });
  });
}

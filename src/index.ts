import axios, { AxiosResponse } from 'axios';

interface SpiriusClientOptions {
  user: string;
  password: string;
  from: string;
  dryRun?: boolean;
}

interface ISpiriusSendSmsResponse {
  detail: string;
  numberOfSms: number;
  transactionId: string | string[];
  remianingRequestQuota: number;
}

interface ISpiriusClient {
  send: (
    recipients: string[],
    message: string,
    from?: string,
  ) => Promise<AxiosResponse<ISpiriusSendSmsResponse>>;
}

export const SpiriusClient = (opts: SpiriusClientOptions): ISpiriusClient => ({
  send: async (recipients, message, from) =>
    axios.post(
      `https://rest1.spirius.com/v1/sms/mt/send`,
      {
        message,
        from: from || opts.from,
        to: recipients,
        dryRun: opts.dryRun,
      },
      {
        headers: {
          authorization: `Basic ${Buffer.from(
            `${opts.user}:${opts.password}`,
          ).toString('base64')}`,
        },
      },
    ),
});

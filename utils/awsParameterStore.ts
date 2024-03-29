import {
  SSMClient,
  GetParameterCommand,
  GetParameterRequest,
} from '@aws-sdk/client-ssm';

const isDev = process.env.NODE_ENV === 'development';
const NODE_ENV = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';

const envPath = `/${NODE_ENV}/toollit/client/env`;

const keys = {
  NEXT_PUBLIC_SERVER_API_HOST: `${envPath}/NEXT_PUBLIC_SERVER_API_HOST`,
  NEXT_PUBLIC_CLIENT_HOST: `${envPath}/NEXT_PUBLIC_CLIENT_HOST`,
  NEXT_PUBLIC_S3_URL: `${envPath}/NEXT_PUBLIC_S3_URL`,
  NEXT_PUBLIC_CONTACT_EMAIL: `${envPath}/NEXT_PUBLIC_CONTACT_EMAIL`,
};

const env = keys;

type key = keyof typeof keys;

interface ParameterKey {
  key: key;
}

const client = new SSMClient({
  region: 'ap-northeast-2',
});

function getValueByKey({ key }: ParameterKey): (typeof env)[key] {
  return env[key];
}

const getParameterStore = async ({ key }: ParameterKey) => {
  if (isDev) {
    const value = process.env[key];
    return value;
  }

  const parameterStorePath = getValueByKey({ key });

  const params: GetParameterRequest = {
    Name: parameterStorePath,
    WithDecryption: true,
  };
  const command = new GetParameterCommand(params);

  try {
    const data = await client.send(command);

    const value = data.Parameter?.Value;

    if (!value) {
      throw new Error('The parameter store has no value.');
    }

    return value;
  } catch (err) {
    console.error('getParameterStore error =>', err);
    return '';
  }
};

export { getParameterStore };

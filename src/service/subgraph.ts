import { gql } from 'graphql-request';

const DIGI_NAMEHASH =
  '0x59939fcf25db609ecf5f5227ca8ba38955b1ae85ccfff1f8c65f64634c135017';

export const GET_DOMAINS = gql`
  query getDomains($tokenId: String) {
    domain(id: $tokenId) {
      id
      labelhash
      name
      createdAt
      parent {
        id
      }
      resolver {
        texts
        address
      }
    }
  }
`;

export const GET_DOMAINS_BY_LABELHASH = gql`
  query getDomains($tokenId: String) {
    domains(
      where: {
        parent: "${DIGI_NAMEHASH}",
        labelhash: $tokenId
      }
    ) {
      id
      labelhash
      name
      createdAt
      parent {
        id
      }
      resolver {
        texts
        address
      }
    }
  }
`;

export const GET_REGISTRATIONS = gql`
  query getRegistration($labelhash: String) {
    registrations(
      orderBy: registrationDate
      orderDirection: desc
      where: { id: $labelhash }
    ) {
      labelName
      registrationDate
      expiryDate
    }
  }
`;

export const GET_WRAPPED_DOMAIN = gql`
query getWrappedDomain($tokenId: String) {
  wrappedDomain(id: $tokenId) {
    id
    owner {
      id
    }
    fuses
    expiryDate
    domain {
      name
    }
  }
}
`;

export interface UriData {
  protocol: string;
  host: string;
  origin: string;
  maker: string;
  dataType: string;
  status: number;
}

export const UriTypes = {
  UriData: [
    { name: "protocol", type: "string" },
    { name: "host", type: "string" },
    { name: "origin", type: "string" },
    { name: "maker", type: "address" },
    { name: "dataType", type: "bytes4" },
    { name: "status", type: "bytes4" },
  ],
};

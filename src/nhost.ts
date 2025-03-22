// src/nhost.ts
import { NhostClient } from "@nhost/react";

const nhost = new NhostClient({
  subdomain: "", // ✅ Your Nhost subdomain
  region: "",// ✅ Your Nhost region
});

export default nhost; // ✅ Ensure default export

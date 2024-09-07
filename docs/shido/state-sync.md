---
sidebar_position: 3
---

# State-sync

# Stop node & reset data

```bash
sudo systemctl stop shidod

shidod tendermint unsafe-reset-all --home ~/.shidod/ --keep-addr-book
```

# Configure State Sync

```bash
SNAP_RPC="https://archive-shido.rpc.256x25.tech:443"
LATEST_HEIGHT=$(curl -s $SNAP_RPC/block | jq -r .result.block.header.height); \
BLOCK_HEIGHT=$((LATEST_HEIGHT - 1000)); \
TRUST_HASH=$(curl -s "$SNAP_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash)
echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH

sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\1true| ; \

s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\1\"$SNAP_RPC,$SNAP_RPC\"| ; \

s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\1$BLOCK_HEIGHT| ; \

s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\1\"$TRUST_HASH\"|" ~/.shidod/config/config.toml

more ~/.shidod/config/config.toml | grep 'rpc_servers'

more ~/.shidod/config/config.toml | grep 'trust_height'

more ~/.shidod/config/config.toml | grep 'trust_hash'
```

# Download Wasm

```bash
rm -rf ~/.shidod/wasm
curl -o - -L https://snapshots.256x25.tech/snapshots/shido/wasm.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.shidod/
```

# Restart Node

```bash
sudo systemctl restart shidod
```
- Check logs

```bash
sudo journalctl -u shidod -f --no-hostname -o cat
```

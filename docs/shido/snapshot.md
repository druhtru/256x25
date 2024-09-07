---
sidebar_position: 2
---

import SnapshotFrame from '@site/src/components/SnapshotFrame';

# Snapshots

# Snapshot information

<SnapshotFrame />

# Shido Snapshot Server Setup

```bash
sudo apt update
sudo apt install snapd -y
sudo snap install lz4
```

- Change pruning

```bash
sed -i \
-e 's|^pruning *=.*|pruning = "custom"|' \
-e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
-e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
-e 's|^pruning-interval *=.*|pruning-interval = "10"|' \
$HOME/.shidod/config/app.toml
```

- Off indexer

```bash
sed -i \
-e 's|^indexer *=.*|indexer = "null"|' \
$HOME/.shidod/config/config.toml
```

- Download the snapshot

```bash
wget -O shido_snapshot.tar.lz4 https://snapshots.256x25.tech/snapshots/shido/shido_snapshot.tar.lz4
```

- Stop node

```bash
sudo service shidod stop
```

:::danger Take care

Reset your node. This will erase your node database. If you are already running validator, be sure you backed up your **priv_validator_key.json** prior to running the command. The command does not wipe the file. However, you should have a backup of it already in a safe location.

WARNING: If you use this snapshot on a validator node during a chain halt, make sure you back up **priv_validator_state.json** and then replace it after the snapshot is extracted but before you start the node process. This is very important in order to avoid double-sign. When in doubt, reach out to the project team.

:::

- Back up priv_validator_state.json if needed

```bash
cp ~/.shidod/data/priv_validator_state.json ~/.shidod/priv_validator_state.json
```
- Reset node state

```bash
shidod tendermint unsafe-reset-all --home $HOME/.shidod --keep-addr-book
```

- Decompress the snapshot to your database location. You database location will be something to the effect of ~/.shidod/data depending on your node implementation.

```bash
lz4 -c -d shido_snapshot.tar.lz4 | tar -x -C $HOME/.shidod
```

:::warning IMPORTANT:
If you run a validator node and the chain is in halt, it is time to replace the priv_validator_state.json file that you have backed up.
Replace with the backed-up priv_validator_state.json
:::

```bash
cp ~/.shidod/priv_validator_state.json ~/.shidod/data/priv_validator_state.json
```

- Restart your node

```bash
sudo service shidod start
```

- Remove downloaded snapshot to free up space

```bash
rm -v shido_snapshot.tar.lz4
```

- Make sure that your node is running

```bash
sudo service shidod status && sudo journalctl -u shidod -f
```
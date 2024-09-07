---
sidebar_position: 1
---

# Node install

# System requirements

- 4 or more physical CPU cores (**recommended 8 CPU**)
- At least 200GB of NVME SSD disk storage. Hard drive I/O speed is crucial! (**recommended 700GB+ NVMe**)
- At least 8GB of memory (RAM) (**recommended 16GB**)
- **At least 100mbps** network bandwidth

# Dependencies Installation

```bash
sudo apt update
sudo apt install -y curl git jq lz4 wget unzip build-essential
```

```bash
sudo rm -rf /usr/local/go
curl -L https://go.dev/dl/go1.21.6.linux-amd64.tar.gz | sudo tar -xzf - -C /usr/local
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.bash_profile
source .bash_profile
```

# Node Installation

- Clone project repository:

```bash
git clone https://github.com/ShidoGlobal/mainnetShidoNodeSync.git
```

- Copy file (in some cases must be used with **sudo**)

```bash
cp mainnetShidoNodeSync/ubuntu22.04build/shidod /usr/local/bin/
chmod +x /usr/local/bin/shidod
cp mainnetShidoNodeSync/libwasmvm.x86_64.so /usr/lib
```

- Initialize the node

```bash
shidod init YourNodeName --chain-id shido_9008-1
```

- Replace genesis

```bash
cp mainnetShidoNodeSync/genesis.json $HOME/.shidod/config/
```

- Set node CLI configuration

```bash
shidod config chain-id shido_9008-1
shidod config keyring-backend file
```

- Change timeout_commit

```bash
sed -i 's/timeout_commit = "3s"/timeout_commit = "1s"/g' "$HOME/.shidod/config/config.toml"
```

- Set minimum gas price

```bash
sed -i -e 's|^minimum-gas-prices *=.*|minimum-gas-prices = "0.25shido"|' $HOME/.shidod/config/app.toml
```

- Change laddr

```bash
sed -i -e "s%tcp://127.0.0.1:26657%tcp://0.0.0.0:26657%" $HOME/.shidod/config/config.toml
```

- Set peers

```bash
PEERS=7ed728831ff441d18a8556b64afcaebc31b68c74@3.76.57.158:26656,f28f693053306fba8bf59c4a54b7bd9f89de7ebb@18.193.227.128:26656,181fcc5672fee87751eb369491744e85ba0651f5@18.153.233.126:26656,8d46e292347951d651486611abac77825a0c83f8@18.199.25.117:26656,cdf19a7234ee8ec12519f6ad066408f09e1b73e0@15.157.50.94:26656
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.shidod/config/config.toml
```

- Create a service

```bash
sudo tee /etc/systemd/system/shidod.service > /dev/null << EOF
[Unit]
Description=Shido node service
After=network-online.target
[Service]
User=$USER
ExecStart=/usr/local/bin/shidod start
Restart=on-failure
RestartSec=10
LimitNOFILE=4096
[Install]
WantedBy=multi-user.target
EOF
```

- Enable & Start the service and check the logs

```bash
sudo systemctl daemon-reload
sudo systemctl enable shidod.service

sudo systemctl start shidod
sudo journalctl -u shidod -f --no-hostname -o cat
```
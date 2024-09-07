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
curl -L https://go.dev/dl/go1.20.4.linux-amd64.tar.gz | sudo tar -xzf - -C /usr/local
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.bash_profile
source .bash_profile
```

# Node Installation

- Clone repository & build node:

```bash
cd $HOME rm -rf blockx
git clone https://github.com/BlockXLabs/BlockX-Genesis-Mainnet1 blockx
cd blockx
make install
```

- Initialize the node

```bash
blockxd init YourNodeName --chain-id blockx_190-1
```

- Download genesis

```bash
wget -O genesis.json https://snapshots.256x25.tech/snapshots/blockx/genesis.json --inet4-only
mv genesis.json ~/.blockxd/config
```

- Set node CLI configuration

```bash
blockxd config chain-id blockx_190-1
blockxd config keyring-backend file
```

- Set minimum gas price

```bash
sed -i -e 's|^minimum-gas-prices *=.*|minimum-gas-prices = "0.025abcx"|' $HOME/.blockxd/config/app.toml
```

- Set peers

```bash
PEERS="479dfa1948f49b08810cd16bf6c2d3256ae85423@137.184.7.64:26656,85d0069266e78896f9d9e17915cdfd271ba91dfd@146.190.153.165:26656,f34a55c5d97a4aebf64e3585da2cc978d66a31b7@195.3.221.249:31656,9bb9207e52b2d46b0bc69ae3ecd863efd3380ca6@65.108.232.168:39656,9b84b33d44a880a520006ae9f75ef030b259cbaf@137.184.38.212:26656,8ebf5e70dad7268a66a9198dbe9006f9140415b6@162.19.69.193:26656,66fccb6e7953e644ae61f974464a3716318a3275@54.211.219.127:26656,928b5c1480b35b1a7e212a1c11fce63fdf1ab323@142.132.251.87:15156,637077d431f618181597706810a65c826524fd74@176.9.120.85:26356,e1a613fcc3c141c2235ce68edea4e765a3eb3c92@135.181.5.232:26356"
sed -i 's|^persistent_peers *=.*|persistent_peers = "'$PEERS'"|' $HOME/.blockxd/config/config.toml
```

- Create a service

```bash
sudo tee /etc/systemd/system/blockxd.service > /dev/null << EOF
[Unit]
Description=blockxd node service
After=network-online.target
[Service]
User=$USER
ExecStart=$(which blockxd) start
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
sudo systemctl enable blockxd.service

sudo systemctl start blockxd
sudo journalctl -u blockxd -f --no-hostname -o cat
```
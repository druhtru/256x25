---
sidebar_position: 6
---

# Upgrade

# Upgrade to v2.0.0
# `Height: 4303000`

```bash
#Stop node
sudo systemctl stop shidod
# Removing the old version
sudo rm /usr/local/bin/shidod
# Clone new binary
git clone https://github.com/ShidoGlobal/shidoupgrade_v2.0.0.git
```
- Copy new binary **FOR UBUNTU 20.04**
```bash
sudo cp shidoupgrade_v2.0.0/ubuntu20.04build/shidod /usr/local/bin/
sudo chmod +x /usr/local/bin/shidod
```

- Copy new binary **FOR UBUNTU 22.04**
```bash
sudo cp shidoupgrade_v2.0.0/ubuntu22.04build/shidod /usr/local/bin/
sudo chmod +x /usr/local/bin/shidod
```

```bash
# Check if the node has been updated
shidod version
# Start node
sudo systemctl restart shidod
```
---
sidebar_position: 5
---

# Cheat sheets

# Key managment

:::tip
Replace **keyname** with any name you want to use for the key name
:::

- Create new key 

```bash
shidod keys add keyname
```

- Recover Existing Key

```bash
shidod keys add keyname --recover
```

- List All Keys 

```bash
shidod keys list
```

- Delete Key

```bash
shidod keys delete keyname
```

# Create & Edit Existing Validator

```bash
shidod tx staking create-validator \
--amount=1000000000000000000shido \
--pubkey=$(shidod tendermint show-validator) \
--commission-rate="0.05" \
--commission-max-rate="0.20" \
--commission-max-change-rate="0.01" \
--min-self-delegation="1000000" \
--moniker="your validator name" \
--from= keyname 
```

- Add validator information

```bash
shidod tx staking edit-validator \
--identity=your identity \
--details="your details" \
--website="your validator website" \
--security-contact "The validator security contact email"
--from= keyname 
```

- Edit Existing Validator

```bash
shidod tx staking edit-validator
--new-moniker="your new validator name" \
--identity=your new identity name \
--details="your new details" \
--commission-rate=0.05 \
--from= keyname
```

- Unjail Validator

```bash
shidod tx slashing unjail --from keyname -y
```

# Tokens

- Withdraw Rewards From All Validators

```bash
shidod tx distribution withdraw-all-rewards --from keyname
```
- Withdraw Commission And Rewards From Your Validator

```bash
shidod tx distribution withdraw-rewards $(shidod keys show keyname --bech val -a) --commission --from  keyname
```

# Governance

- View Proposal By ID **Example: shidod query gov proposal 3**

```bash
shidod query gov proposal Proposal id
```

- Vote YES

```bash
shidod tx gov vote Proposal id yes --from keyname
```

- Vote NO

```bash
shidod tx gov vote Proposal id no --from keyname
```

- Vote NO_WITH_VETO

```bash
shidod tx gov vote Proposal id no_with_veto --from keyname
```

- Vote ABSTAIN

```bash
shidod tx gov vote Proposal id abstain --from keyname
```

# Service Management

- Reload Services

```bash
sudo systemctl daemon-reload
```

- Enable Service

```bash
sudo systemctl enable shidod
```

- Disable Service

```bash
sudo systemctl disable shidod
```

- Run Service

```bash
sudo systemctl start shidod
```

- Stop Service

```bash
sudo systemctl stop shidod
```

- Restart Service

```bash
sudo systemctl restart shidod
```

- Check Service Status

```bash
sudo systemctl status shidod
```

- Check Service Logs

```bash
sudo journalctl -u shidod -f --no-hostname -o cat
```
#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

CYBER_REF='bostrom-dev'
ROOT_PROTO_DIR="./proto/cyber/go-cyber-$CYBER_REF"
CYBER_PROTO_DIR="$ROOT_PROTO_DIR/proto"
THIRD_PARTY_PROTO_DIR="$ROOT_PROTO_DIR/third_party/proto"
LIQUIDITY_PROTO_DIR="./proto/cyber/liquidity-master/proto"
LIQUIDITY_THIRD_PARTY_PROTO_DIR="./proto/cyber/liquidity-master/third_party/proto"
OUT_DIR="./src/codec/"

mkdir -p "$OUT_DIR"

# echo $THIRD_PARTY_PROTO_DIR

protoc \
  --plugin="$(yarn bin protoc-gen-ts_proto)" \
  --ts_proto_out="$OUT_DIR" \
  --proto_path="$CYBER_PROTO_DIR" \
  --proto_path="$THIRD_PARTY_PROTO_DIR" \
  --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=true" \
  "$THIRD_PARTY_PROTO_DIR/cosmos_proto/pagination.proto" \
  "$CYBER_PROTO_DIR/cyber/base/query/v1beta1/pagination.proto" \
  "$CYBER_PROTO_DIR/cyber/graph/v1beta1/types.proto" \
  "$CYBER_PROTO_DIR/cyber/graph/v1beta1/query.proto" \
  "$CYBER_PROTO_DIR/cyber/graph/v1beta1/tx.proto" \
  "$CYBER_PROTO_DIR/cyber/bandwidth/v1beta1/types.proto" \
  "$CYBER_PROTO_DIR/cyber/bandwidth/v1beta1/query.proto" \
  "$CYBER_PROTO_DIR/cyber/resources/v1beta1/types.proto" \
  "$CYBER_PROTO_DIR/cyber/resources/v1beta1/query.proto" \
  "$CYBER_PROTO_DIR/cyber/resources/v1beta1/tx.proto" \
  "$CYBER_PROTO_DIR/cyber/rank/v1beta1/types.proto" \
  "$CYBER_PROTO_DIR/cyber/rank/v1beta1/query.proto" \
  "$CYBER_PROTO_DIR/cyber/energy/v1beta1/types.proto" \
  "$CYBER_PROTO_DIR/cyber/energy/v1beta1/query.proto" \
  "$CYBER_PROTO_DIR/cyber/energy/v1beta1/tx.proto"

protoc \
  --plugin="$(yarn bin protoc-gen-ts_proto)" \
  --ts_proto_out="$OUT_DIR" \
  --proto_path="$LIQUIDITY_PROTO_DIR" \
  --proto_path="$LIQUIDITY_THIRD_PARTY_PROTO_DIR" \
  --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=true" \
  "$LIQUIDITY_THIRD_PARTY_PROTO_DIR/cosmos_proto/coin.proto" \
  "$LIQUIDITY_THIRD_PARTY_PROTO_DIR/cosmos_proto/pagination.proto" \
  "$LIQUIDITY_THIRD_PARTY_PROTO_DIR/protoc-gen-openapiv2/options/annotations.proto" \
  "$LIQUIDITY_PROTO_DIR/tendermint/liquidity/v1beta1/tx.proto" \
  "$LIQUIDITY_PROTO_DIR/tendermint/liquidity/v1beta1/liquidity.proto" \
  "$LIQUIDITY_PROTO_DIR/tendermint/liquidity/v1beta1/query.proto"

# Remove unnecessary codec files
rm -rf \
  src/codec/gogoproto/ \
  src/codec/google/api/ \
  src/codec/google/protobuf/descriptor.ts \
  src/codec/protoc-gen-openapiv2
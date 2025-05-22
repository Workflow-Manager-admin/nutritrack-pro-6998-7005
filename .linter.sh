#!/bin/bash
cd /home/kavia/workspace/code-generation/nutritrack-pro-6998-7005/main_container_for_nutritrack_pro
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


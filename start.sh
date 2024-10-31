#!/bin/bash

# 
#   _           _           _     _     _               
#  | |__   ___ | |_   _ __ | |__ (_)___| |__   ___ _ __ 
#  | '_ \ / _ \| __| | '_ \| '_ \| / __| '_ \ / _ \ '__|
#  | |_) | (_) | |_  | |_) | | | | \__ \ | | |  __/ |   
#  |_.__/ \___/ \__| | .__/|_| |_|_|___/_| |_|\___|_|   
#                    |_|                                
RED="$(printf '\033[31m')"  GREEN="$(printf '\033[32m')"  ORANGE="$(printf '\033[33m')"  BLUE="$(printf '\033[34m')"
MAGENTA="$(printf '\033[35m')" CYAN="$(printf '\033[36m')"  WHITE="$(printf '\033[37m')" BLACK="$(printf '\033[30m')"
REDBG="$(printf '\033[41m')"  GREENBG="$(printf '\033[42m')"  ORANGEBG="$(printf '\033[43m')"  BLUEBG="$(printf '\033[44m')"
MAGENTABG="$(printf '\033[45m')"  CYANBG="$(printf '\033[46m')"  WHITEBG="$(printf '\033[47m')" BLACKBG="$(printf '\033[40m')"  
RESETBG="$(printf '\e[0m\n')"
__VERSION__="0.0.1"


banner(){
cat << EOF
   _           _           _     _     _               
  | |__   ___ | |_   _ __ | |__ (_)___| |__   ___ _ __ 
  | '_ \ / _ \| __| | '_ \| '_ \| / __| '_ \ / _ \ '__|
  | |_) | (_) | |_  | |_) | | | | \__ \ | | |  __/ |   
  |_.__/ \___/ \__| | .__/|_| |_|_|___/_| |_|\___|_|   
                    |_| 

  github          :     ${WHITEBG}${BLACK} https://github.com/whmer ${RESETBG}
  version         :     $__VERSION__       
  creator         :     dreqxy onion
  author          :     whmer - sam 
  description     :     channeled and unplugged, why not?    
EOF
timeout 3s curl -fIs "https://www.instagram.com/" > /dev/null
if [[ $? -eq 0 ]]; then
echo -e "${WHITE}  status          : ${GREEN}    on-line"
else
echo -e "${WHITE}  status          : ${RED}    off-line"
fi
echo ""
}

clear;
banner;
#npm install .
node index.js

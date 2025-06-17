if [ $# -eq 0 ];then
    echo "No arguments provided"
else
    count=0
    for arg in "$@"; do
        echo "$arg"
        count=$((count + 1))
        if [ $count -eq 3 ]; then
            break
        fi
    done
if
        
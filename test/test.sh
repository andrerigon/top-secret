
id=`date "+%Y-%m-%d_%H:%M:%S"`

# $1 - number of requests
# $2 - concurrency

ab -n $1 -c $2 -p vote1 -T application/x-www-form-urlencoded  http://127.0.0.1:8124/result > test_vote1_$id.txt &
ab -n $1 -c $2 -p vote2 -T application/x-www-form-urlencoded  http://127.0.0.1:8124/result > test_vote2_$id.txt 

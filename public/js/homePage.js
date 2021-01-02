orig=1000000;
prev=0;
function changes()
{
    let bid=document.getElementById("price").value;
    let name=document.getElementById("name").value;
    if(bid<orig||bid<prev)
      alert("lesser than the highest bid");
    else
    {
    var elem=document.getElementById("bid-value").innerHTML=bid;
    document.getElementById("bid-name").innerHTML=name;
    }
    prev=bid;
}
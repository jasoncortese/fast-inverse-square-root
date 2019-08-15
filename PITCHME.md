## Fast Inverse Square Root Algorithm
#### (or, evil floating point bit level hacking)


---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> The Magic Number</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">We're looking for three-halves of a constant K, from which we can subtract one-half of the integer to approximate the inverse square root of the float.</div>
@snapend

@snap[midpoint span-75 text-06]
`\[{\large{I}_y} \approx {\small\frac{3}{2}} K -{\small\frac{1}{2}}{\large{I}_x}\]
\[\]
\[K = L(B - \sigma) = (2^{23}) (127 - 0.0450465)\]
\[\]
\[K = 1064975338\]
\[\]
\[{\small\frac{3}{2}} K = 1597463007\]`
<div style="margin-left: 40px;" class="fragment">
`\[= 0x5f3759df\]`
</div>
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-top: -150px; text-align: left;">We found our magic number! <br/>
    <span style="font-size: 12px;">(Note, we chose a value for σ = 0.0450465 which yields our magic number directly, while research has shown σ = 0.0450333 is more accurate.)</span></div>
@snapend

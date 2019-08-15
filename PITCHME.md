---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> Math is hard, m'kay?</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">In 3D graphics you do a lot of normalizing vectors, and that involves a lot of inverses and square roots, both of which are expensive operations (back then, quadruply so).</div>
@snapend

@snap[midpoint span-75 text-06]
`\[y = {1 \over \sqrt{x}} = x^{-\frac{1}{2}}\]
\[\log_2 y = -{\small\frac{1}{2}} {\log_2 x}\]
\[\log_2 y \approx (x - 1) + \sigma\]
\[\]
\[y \approx {{2}}^{(x - 1)} {{2}}^\sigma\]
\[y' \approx -{{3y - {x}{y^3}} \over {2}}\]`
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-top: -150px; text-align: left;">Logarithms would simplify these calculations, and logarithms can be linearly approximated. Now let's take a look at...</div>
@snapend

@snap[east span-30 text-05]
@img[](ln.png)
@img[](0.5.png)
@snapend



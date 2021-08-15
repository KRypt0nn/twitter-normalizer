focused = true;

document.addEventListener('focus', () => focused = true);
document.addEventListener('blur',  () => focused = false);

setInterval(() => {
    // work only when page focused
    if (focused)
    {
        applied = 0;

        // buttons
        document.querySelectorAll('div').forEach((item) => {
            if (item.attributes['aria-label'] !== undefined)
            {
                let ariaLabel = item.attributes['aria-label'].value;

                // Follow button
                if (ariaLabel.substr(0, 7) == 'Follow ')
                {
                    // Topics to follow
                    if (ariaLabel.substr(ariaLabel.length - 5) == 'Topic')
                    {
                        item.style['background-color'] = 'white';
                    }

                    // Users to subscribe on
                    else
                    {
                        if (item.classList.contains('twitter-normalized-button-following'))
                            item.classList.remove('twitter-normalized-button-following');

                        if (!item.classList.contains('twitter-normalized-button'))
                            item.classList.add('twitter-normalized-button');
                    }

                    ++applied;
                }

                // Following button
                else if (ariaLabel.substr(0, 10) == 'Following ')
                {
                    // Topics to follow
                    if (ariaLabel.substr(ariaLabel.length - 5) == 'Topic')
                    {
                        item.style['background-color'] = 'white';
                    }

                    // Users to subscribe on
                    else
                    {
                        if (item.classList.contains('twitter-normalized-button'))
                            item.classList.remove('twitter-normalized-button');

                        if (!item.classList.contains('twitter-normalized-button-following'))
                            item.classList.add('twitter-normalized-button-following');
                    }

                    ++applied;
                }
            }
        });

        // navigation
        document.querySelectorAll('nav').forEach((item) => {
            if (item.attributes['aria-label'] !== undefined)
            {
                let ariaLabel = item.attributes['aria-label'].value;

                // Primary (left menu)
                if (ariaLabel.substr(0, 7) == 'Primary')
                {
                    let currHref = '/' + location.href.split('/').slice(3).join('/');

                    item.childNodes.forEach((a) => {
                        // links
                        if (a.attributes['href'] !== undefined)
                        {
                            // active link
                            if (a.attributes['href'].value == currHref)
                            {
                                if (!a.classList.contains('twitter-normalized-nav-link'))
                                    a.classList.add('twitter-normalized-nav-link');
                            }

                            // inactive link
                            else
                            {
                                if (a.classList.contains('twitter-normalized-nav-link'))
                                    a.classList.remove('twitter-normalized-nav-link');
                            }

                            ++applied;
                        }
                    });
                }
            }
        });

        // a-buttons
        document.querySelectorAll('a').forEach((item) => {
            // all the buttons developers changed color like an idiots
            if (item.attributes['style'] !== undefined && item.attributes['style'].value == 'background-color: rgb(15, 20, 25);')
            {
                if (!item.classList.contains('twitter-normalized-button-following'))
                    item.classList.add('twitter-normalized-button-following');
                
                ++applied;
            }
        });

        if (applied > 0)
            console.log('twitter-normalizer: applied to ' + applied + ' elements');
    }
}, 1);
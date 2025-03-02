/// dark and light icon variables
const moon = document.getElementById('moon');
const sun = document.getElementById('sun');

const userTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

/// function to toggle icon
const toggleIcon = () => {

    moon.classList.toggle("hidden");
    sun.classList.toggle("hidden");
}

/// change theme (auto)
const autoChangeTheme = () => {

    if (userTheme === 'dark' || (!userTheme && systemTheme)) {

        document.documentElement.classList.add('dark');
        moon.classList.add('hidden');
        sun.classList.remove('hidden');
        return;
    }

    sun.classList.add('hidden');
    moon.classList.remove('hidden');
};

/// change theme
const toggleTheme = () => {

    if (document.documentElement.classList.contains('dark')) {

        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        toggleIcon();
        return
    }

    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    toggleIcon();
};

/// click event
moon.addEventListener('click' ,() => {

    toggleTheme();
});

sun.addEventListener('click' ,() => {

    toggleTheme();
});

autoChangeTheme();
//// dropdown select
select_menu.forEach(menu => {

    const select_btn = menu.querySelector('.select-btn');
    const dp = menu.querySelector('.select-dropDown');
    const selected_txt = menu.querySelector('.selected-text');
    const select_options = menu.querySelectorAll('.select-option');

    select_btn.addEventListener('click', (event) => {

        event.stopPropagation();
        dp.classList.toggle('hidden');
    });


    select_options.forEach(opt => {

        opt.addEventListener('click', (event) => {

            event.stopPropagation();
            selected_txt.innerHTML = opt.innerHTML;
            selected_txt.dataset.id = opt.dataset.id;
            dp.classList.add('hidden');
        });
    });
});

document.addEventListener('click', (event) => {

    select_menu.forEach(menu => {

        const dp = menu.querySelector('.select-dropDown');
        const select_btn = menu.querySelector('.select-btn');

        if (!menu.contains(event.target) && !select_btn.contains(event.target)) {

            if (!dp.classList.contains('hidden')) {

                dp.classList.add('hidden');
            }
        }
    });
});

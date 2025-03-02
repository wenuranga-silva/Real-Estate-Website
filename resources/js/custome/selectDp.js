//// drop down variables
const select_menu = document.querySelectorAll('.select-menu');


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

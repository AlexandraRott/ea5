const buttons = document.querySelectorAll('nav ul li a');
const shapesContent = document.getElementById('shapesContent');
const sphereContent = document.getElementById('sphereContent');

const contentBlocks = {
    shapes: () => {
        sphereContent.style.display = 'none';
        shapesContent.style.display = 'block';
    },
    sphere: () => {
        shapesContent.style.display = 'none';
        sphereContent.style.display = 'block';
    }
};

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const id = button.getAttribute('id');
        if (contentBlocks[id]) {
            contentBlocks[id]();
        }
    });
});

function displayShapes() {
    // Создаем сцену
    var scene = new THREE.Scene();

    // Создаем камеру
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Создаем рендерер
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Создаем контейнер для рендерера
    var shapesContainer = document.getElementById("shapesContainer");
    shapesContainer.appendChild(renderer.domElement);

    // Создаем цилиндр
    var cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 32);
    var blueMaterial = new THREE.MeshBasicMaterial({ color: 0x00aaff });
    var cylinder = new THREE.Mesh(cylinderGeometry, blueMaterial);
    cylinder.position.x = -1.1;
    scene.add(cylinder);

    // Создаем конус
    var coneGeometry = new THREE.ConeGeometry(1, 2, 32);
    var pinkMaterial = new THREE.MeshBasicMaterial({ color: 0xff66a1 });
    var cone = new THREE.Mesh(coneGeometry, pinkMaterial);
    cone.position.x = 1.1;
    scene.add(cone);

    // Создаем материал для белых граней
    var whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });

    // Создаем меш для цилиндра с белым материалом для граней
    var cylinderWireframe = new THREE.Mesh(cylinderGeometry, whiteMaterial);
    cylinderWireframe.position.x = -1.1;
    scene.add(cylinderWireframe);

    // Создаем меш для конуса с белым материалом для граней
    var coneWireframe = new THREE.Mesh(coneGeometry, whiteMaterial);
    coneWireframe.position.x = 1.1;
    scene.add(coneWireframe);

    // Скорость вращения
    var rotationSpeed = 0.05;

    // Добавляем обработчики событий для клавиш влево и вправо
    function handleKeyDown(event) {
        if (event.key === 'ArrowLeft') {
            scene.rotation.y += rotationSpeed;
        } else if (event.key === 'ArrowRight') {
            scene.rotation.y -= rotationSpeed;
        }
    }

    // Обновляем размеры канваса при изменении размеров окна
    window.addEventListener('resize', function () {
        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;

        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(newWidth, newHeight);
    });

    // Добавляем обработчики событий для клавиш
    window.addEventListener('keydown', handleKeyDown);

    // Создаем вращение для сцены (включая цилиндр и конус) только вокруг оси Y
    function animate() {
        requestAnimationFrame(animate);

        // Вращение сцены (включая цилиндр и конус) только вокруг оси Y
        renderer.render(scene, camera);
    }

    // Вызываем функцию анимации
    animate();

};

function displaySphere() {
    // Получаем ссылку на контейнер
    var container = document.getElementById("sphereContainer");

    // Создаем сцену
    var scene = new THREE.Scene();

    // Создаем камеру
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Создаем рендерер
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Создаем цилиндр
    //  var cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 32);
    //  var blueMaterial = new THREE.MeshBasicMaterial({ color: 0x00aaff });
    //  var cylinder = new THREE.Mesh(cylinderGeometry, blueMaterial);
    //  cylinder.position.x = -1.1;
    //  scene.add(cylinder);

    // Создаем шар
    var geometry = new THREE.SphereGeometry(1, 32, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0xff66b2 });
    var sphereWireframe = new THREE.Mesh(geometry, material);
    scene.add(sphereWireframe);


    // Создаем материал для белых граней
    var whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });

    // Создаем меш для сферы с заданной геометрией и белым материалом
    var sphere = new THREE.Mesh(geometry, whiteMaterial);

    // Добавляем сферу в сцену
    scene.add(sphere);

    // Переменные для отслеживания состояния клавиш
    var keyState = {};

    // Добавляем обработчики событий для клавиш вправо и влево
    document.addEventListener("keydown", function (event) {
        keyState[event.key] = true;
    });

    document.addEventListener("keyup", function (event) {
        keyState[event.key] = false;
    });


    // Добавляем обработчик событий для изменения глубины рекурсии
    var depthInput = document.getElementById("depthInput");
    depthInput.addEventListener("input", function () {
        var depth = parseInt(this.value);
        updateDepth(depth);
    });

    // Функция для обновления глубины рекурсии
    function updateDepth(depth) {
        // Удаляем текущую сферу и ее обводку из сцены
        scene.remove(sphere);
        scene.remove(sphereWireframe);

        // Создаем новую геометрию для основной сферы с учетом новой глубины рекурсии
        var newGeometry = new THREE.SphereGeometry(1, depth * 8, depth * 8);

        // Создаем новую сферу с новой геометрией
        var newSphere = new THREE.Mesh(newGeometry, material);

        // Создаем новую обводку для сферы с новой геометрией
        var newSphereWireframe = new THREE.Mesh(newGeometry, whiteMaterial);

        // Добавляем новую сферу и ее обводку в сцену
        scene.add(newSphere);
        scene.add(newSphereWireframe);

        // Обновляем ссылки на текущие объекты
        sphere = newSphere;
        sphereWireframe = newSphereWireframe;
    }

    // Функция для анимации
    function animate() {
        requestAnimationFrame(animate);

        // Проверяем состояние клавиш и изменяем углы вращения сцены (включая сферу и обводку)
        if (keyState["ArrowRight"]) {
            scene.rotation.y += 0.01;
        }

        if (keyState["ArrowLeft"]) {
            scene.rotation.y -= 0.01;
        }

        renderer.render(scene, camera);
    }

    // Вызываем функцию анимации
    animate();

}

displaySphere();
displayShapes()


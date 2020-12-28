var ASMAPI = Java.type('net.minecraftforge.coremod.api.ASMAPI');
var Opcodes = Java.type('org.objectweb.asm.Opcodes');

var mappedMethodName = ASMAPI.mapMethod('func_228426_a_');

var shouldRender = ASMAPI.mapMethod('func_229086_a_');
var renderEntity = ASMAPI.mapMethod('func_228418_a_');

function initializeCoreMod() {
    return {
        'coremodmethod': {
            'target': {
                'type': 'METHOD',
                'class': 'net.minecraft.client.renderer.WorldRenderer',
                'methodName': mappedMethodName,
                'methodDesc': '(Lcom/mojang/blaze3d/matrix/MatrixStack;FJZLnet/minecraft/client/renderer/ActiveRenderInfo;Lnet/minecraft/client/renderer/GameRenderer;Lnet/minecraft/client/renderer/LightTexture;Lnet/minecraft/util/math/vector/Matrix4f;)V'
            },
            'transformer': function(method) {
                var instruction = ASMAPI.findFirstMethodCall(method, ASMAPI.MethodType.VIRTUAL, 'net/minecraft/client/renderer/entity/EntityRendererManager', shouldRender, '(Lnet/minecraft/entity/Entity;Lnet/minecraft/client/renderer/culling/ClippingHelper;DDD)Z');
                var labelInstruction = ASMAPI.findFirstMethodCall(method, ASMAPI.MethodType.SPECIAL, 'net/minecraft/client/renderer/WorldRenderer', renderEntity, '(Lnet/minecraft/entity/Entity;DDDFLcom/mojang/blaze3d/matrix/MatrixStack;Lnet/minecraft/client/renderer/IRenderTypeBuffer;)V');
                labelInstruction = labelInstruction.getNext();
                for (var i = 0; i < 8; i++) {
                    instruction = instruction.getPrevious();
                }
                var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
                var newInstruction1 = new VarInsnNode(Opcodes.ALOAD, 40);
                var newInstruction2 = new VarInsnNode(Opcodes.DLOAD, 12);
                var newInstruction3 = new VarInsnNode(Opcodes.DLOAD, 16);
                var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
                var newInstruction4 = new MethodInsnNode(Opcodes.INVOKESTATIC, 'com/github/kyazuki/onlyonechunk/OnlyOneChunk', 'inSameChunk', '(Lnet/minecraft/entity/Entity;DD)Z');
                var JumpInsnNode = Java.type('org.objectweb.asm.tree.JumpInsnNode');
                var newInstruction5 = new JumpInsnNode(Opcodes.IFEQ, labelInstruction);
                var InsnList = ASMAPI.listOf(newInstruction1, newInstruction2, newInstruction3, newInstruction4, newInstruction5);
                method.instructions.insert(instruction, InsnList);
                return method;
            }
        }
    }
}
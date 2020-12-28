package com.github.kyazuki.onlyonechunk;

import net.minecraft.entity.Entity;
import net.minecraftforge.fml.common.Mod;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Mod(OnlyOneChunk.MODID)
public class OnlyOneChunk {
  public static final String MODID = "onlyonechunk";
  public static final Logger LOGGER = LogManager.getLogger(MODID);

  public OnlyOneChunk() {
    LOGGER.debug("OnlyOneChunk loaded!");
  }

  public static boolean inSameChunk(Entity entity, double camX, double camZ) {
    return entity.chunkCoordX == (int) Math.floor(camX / 16) && entity.chunkCoordZ == (int) Math.floor(camZ / 16);
  }
}
